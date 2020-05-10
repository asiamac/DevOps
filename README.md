# DevOps

## multicontapp
Basic Express.js and Redis app with docker.

## greatestcommondivisor
* `/?l1=&l2=` greatest common divisor (GCD) for provided two numbers - from Redis cache or calculated.

## frontend-hello
Basic React.js app with docker.

## multicontainerdemo
* `/l1,l2` GCD for provided two numbers - from Redis cache or calculated,
* `/all-results` for all provided before pairs of numbers computed and stored in postgres database GCD values.

## multi3
Project with:
* frontend React.js app (`localhost:4000`),
* nginx reverse proxy to frontend (`localhost:8080`) and backend (`localhost:8080/api`);
* backend based on Express.js (`localhost:5000`) providing endpoints:
  * `/` liveness healthcheck,
  * `/?angle=&speed=` horizontal projectiles of object thrown at certain angle and with provided speed,
  * `/all-calculated` for all provided before pairs of angle and speed computed and stored in postgres database horizontal projectiles.

## kubernetes
Templates for creating:
* POD `pod-template.yml`,
* ReplicaSet `rs-template.yml`,
* Deployment `deployment-template.yml`.
