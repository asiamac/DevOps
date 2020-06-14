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

## my-cluster2
Cluster with:
* Redis,
* service type ClusterIP (Redis - redis-service),
* Dnsutils,
* backend based on Express.js connected to redis-service,
* service type NodePort.
URLs:
* `/` - present current and previous app ID,
* `/calculate?l1=&l2` - GCD for provided two numbers - from Redis cache or calculated.

## my-cluster3
Cluster with:
* Redis,
* Postgres,
* services type ClusterIP (Redis - redis-service, Postgres - postgres-service),
* Dnsutils,
* backend based on Express.js connected to redis-service and postgres-service,
URLs:
* `/` - present current and previous app ID,
* `/calculate?angle=&speed` - horizontal projectiles of object thrown at certain angle and with provided speed - calculated or from redis cache, saved in postgres,
* `/all-calculated` for all provided before pairs of angle and speed computed and stored in postgres database horizontal projectiles.

## my-cluster4
Cluster with:
* frontend React.js app,
* Redis,
* Postgres,
* services type ClusterIP (Redis - redis-service, Postgres - postgres-service),
* Dnsutils,
* backend based on Express.js connected to redis-service and postgres-service,
URLs:
* `/` - present current and previous app ID,
* `/calculate?angle=&speed` - horizontal projectiles of object thrown at certain angle and with provided speed - calculated or from redis cache, saved in postgres,
* `/all-calculated` for all provided before pairs of angle and speed computed and stored in postgres database horizontal projectiles.
