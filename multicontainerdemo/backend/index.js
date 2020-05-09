const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
  .query('CREATE TABLE IF NOT EXISTS gcd_values (number INT);')
  .catch(err => console.log(err));

// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort
});

app.listen(5000, () => {
  console.log('Backend Listening on port 5000');
});

// Get GCD for two numbers - from Redis cache or compute
app.get('/:l1,:l2', (req, resp) => {

  let l1 = req.params.l1
  let l2 = req.params.l2

  if (!l1 || !l2) {
    resp.send('Provide two numbers to calculate greatest common divisor');
  }

  let cacheKey = `${l1}:${l2}`
  let cacheKeyReverse = `${l2}:${l1}`

  const calculateGCD = (l1, l2) => {
    l1 = parseInt(l1);
    l2 = parseInt(l2);
    let d = 0;

    while (l1%2 === 0 && l2%2 === 0) {
      l1 = l1/2;
      l2 = l2/2;
      d = d + 1;
    }

    while (l1 !== l2) {
      if (l1%2 === 0) {
        l1 = l1/2
      } else if (l2%2 === 0) {
        l2 = l2/2
      } else if (l1 > l2) {
        l1 = (l1 - l2)/2
      } else {
        l2 = (l2 - l1)/2
      }
    }

    const gcd = l1 * Math.pow(2, d);

    redisClient.set(cacheKey, gcd);
    pgClient
        .query('INSERT INTO gcd_values (number) VALUES ($1);', [gcd])
        .catch(err => console.log(err));
    return gcd;
  }

  redisClient.get(cacheKey, (err, gcd_value) => {
    if (gcd_value === null) {
      redisClient.get(cacheKeyReverse, (err, gcd_value) => {
        if (gcd_value === null) {
          gcd_value = calculateGCD(l1, l2);
          resp.send(`Calculated GCD for ${l1} and ${l2} is: ` + gcd_value);
        } else {
          resp.send(`Cached GCD for ${l2} and ${l1} is: ` + gcd_value);
        }
      });
    } else {
      resp.send(`Cached GCD for ${l1} and ${l2} is: ` + gcd_value);
    }
  });

});

// Get all computed already results stored in postgres
app.get('/all-results', (request, response) => {
  pgClient.query('SELECT * FROM gcd_values;', (pgError, queryResult) => {
    if (!queryResult.rows) {
      response.json([]);
    }
    else {
      response.json(queryResult.rows);
    }
  });
});
