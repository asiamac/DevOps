const express = require('express');
const app = express();

const {v4: uuidv4} = require('uuid');

const appId = uuidv4();

const port = 5000;

// Redis Client Setup 
const redis = require('redis');
const redisClient = redis.createClient({
  host: "redis-service",
  port: 6379
});

app.get('/', (req, resp) => {
  let previousAppId = '';
  redisClient.get("app_id", (err, app_id_value) => {
    if (app_id_value === null) {
      previousAppId = 'You are first!';
    } else {
      previousAppId = `Previous app ID was ${app_id_value}`;
    }
    resp.send(`[${appId}] Hello from my backend app! ${previousAppId}`);
    redisClient.set("app_id", appId);
  });
});

app.get('/calculate', (req, resp) => {

  let l1 = req.query.l1;
  let l2 = req.query.l2;

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
        l1 = l1/2;
      } else if (l2%2 === 0) {
        l2 = l2/2;
      } else if (l1 > l2) {
        l1 = (l1 - l2)/2;
      } else {
        l2 = (l2 - l1)/2;
      }
    }

    const gcd = l1 * Math.pow(2, d);

    redisClient.set(cacheKey, gcd);
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

app.listen(port, err => {
  console.log(`Listening on port ${port}`);
  console.log('err', err);
});
