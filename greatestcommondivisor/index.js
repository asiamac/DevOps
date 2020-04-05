const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

// client.set('counter', 0);

app.get('/', (req, resp) => {

  let l1 = req.query.l1
  let l2 = req.query.l2

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

    client.set(cacheKey, gcd);
    return gcd;
  }

  client.get(cacheKey, (err, gcd_value) => {
    if (gcd_value === null) {
      client.get(cacheKeyReverse, (err, gcd_value) => {
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

app.listen(8080, () => {
  console.log('Ser listening on port 8080');
});
