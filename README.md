# DevOps

## greatestcommondivisor
* `/?l1=&l2=` greatest common divisor (GCD) for provided two numbers - from Redis cache or calculated.

## multicontainerdemo
* `/l1,l2` GCD for provided two numbers - from Redis cache or calculated,
* `/all-results` for all provided before pairs of numbers computed and stored in postgres database GCD values.

## multi3
Project with:
* frontend React app (localhost:4000),
* nginx reverse proxy to frontend (loclahost:8080) and backend (loclahost:8080/api);
* backend based on Express.js (loclahost:5000) providing endpoints:
** `/` liveness healthcheck,
** `/?angle=&speed=` horizontal projectiles of object thrown at certain angle and with provided speed,
** `/all-calculated` for all provided before pairs of angle and speed computed and stored in postgres database horizontal projectiles.
