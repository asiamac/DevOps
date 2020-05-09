const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// console.log(keys);

// Redis Client Setup 
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_startegy: () => 1000
});

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
 
pgClient.on('error', () => console.log('Lost PG conenction'));

pgClient
.query('CREATE TABLE IF NOT EXISTS distance_values (angle DECIMAL, speed DECIMAL, distance DECIMAL);')
.catch(err => console.log(err));

const port = 5000;

app.listen(port, err => {
  console.log(`Backend app listening on port ${port}`);
});

app.get('/', (req, resp) => {
  resp.send('Hello from backend!');
});

// Get calculated horizontal travel distance for given angel and speed - from Redis cache or compute
app.get('/calculate', (req, resp) => {

  let angle = req.query.angle
  let speed = req.query.speed

  if (!angle || !speed) {
    resp.send('Provide two numbers to calculate distance');
  }

  let cacheKey = `${angle}:${speed}`

  const calculateDistance = (angle, speed) => {
    angle = parseFloat(angle);
    speed = parseFloat(speed);

    const speedHorizontal = speed * Math.cos(angle*Math.PI/180.0);
    const speedVertical = speed * Math.sin(angle*Math.PI/180.0);
    const gravity = 9.81;

    const time = -speedVertical/-gravity*2;

    const distance = speedHorizontal*time;

    redisClient.set(cacheKey, distance);
    pgClient
      .query('INSERT INTO distance_values (angle, speed, distance) VALUES ($1, $2, $3);', [angle, speed, distance])
      .catch(err => console.log(err));
    return distance;
  }

  redisClient.get(cacheKey, (err, distanceValue) => {
    if (distanceValue === null) {
      distanceValue = calculateDistance(angle, speed);
      resp.send(`Calculated distance for ball thrown at an angle ${angle} degrees and with speed ${speed} m/s is: ${distanceValue} m.`);
    } else {
      resp.send(`Cached distance for ball thrown at an angle ${angle} degrees and with speed ${speed} m/s is: ${distanceValue} m.`);
    }
  });

});

// Get all calculated already results stored in postgres
app.get('/all-calculated', (request, response) => {
  pgClient.query('SELECT * FROM distance_values;', (pgError, queryResult) => {
    if (!queryResult || !queryResult.rows) {
      response.json([]);
    }
    else {
      response.json(queryResult.rows);
    }
  });
});
