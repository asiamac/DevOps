# Docker

## docker

`docker ps` - show started containers and processes

`docker ps -all` - show all containers

`docker system` - show basic commands

`docker system info` – information about system

`docker system prune` – cleaning containers

`docker system prune -all` - remove all unused data

`docker run [IMAGE]` - run new container

`docker exec -it [CONTERNERA_ID] sh` - run a command in a running container and open interactive terminal

`docker run -p [LOCAL_PORT]:[PORT_INSIDE_CONTAINER] [IMAGE | CONTAINER_ID]` - run container and map ports

`docker login` - log in to Docker registry

`sudo docker build -t [NAME]:[TAG] .` - build image from current directory with name and tag

`sudo docker push [USER]/[REPOSITORY]:[TAG] .` - push image to repository of user with tag

`docker images` - list images

`docker images -a` - list all, also inermediate, images

`docker inspect [NAME]` - return low-level information on Docker objects

### docker network

`docker network` - network basic information

`docker network create [NAME]` - create a network

`docker network ls` - list networks

`docker network inspect [NAME]` - display detailed information on one or more networks

`docker network rm [NAME]` - remove one or more netowrks

### run containers and connect them to network

`docker run --rm --name my-postgres -e POSTHRES_PASWORD=123qaz123qaz --netowrk my-demo-app postgres`

`docker run --rm --name my-redis --network my-demo-app redis`

`docker run --env REDIS_HOS=my-redis --rm --name my-demo-app -v /opt/app/ node_modules -v $(pwd):/opt/app -e PGHOST=my-postgres -e PGDATABASE=postgres -e PGPASSWORD=123qaz123qaz -e PGPORT=5432 [IMAGE_ID]`

## docker-compose

`docker-compose` - show basic commands

`docker-compose up` - create and start containers
`docker-compose up –build` - create, build or rebuild and start containers

`docker-compose ps` - list containers

`docker-compose down` - stop and remove containers, networks, images, and volumes

`docker run --network [NETWORK_NAME] --name my-postgres psql -h some-postgres -d postgres`

# Minikube

`minikube start` - start Minikube and create a local cluster

`minikube ip` - obtain IP address through which Minikube VM is exposed to the host system

`minikube stop` - stop a local cluster

`minikube delete` - delete a local cluster

# Kubernetes

`kubectl –help`

`kubectl [COMMAND] –help`

`kubectl cluster-info` - display addresses of the master and services with label kubernetes.io/cluster-service=true

`kubectl create -f [FILENAME]` - deployment of recipe given in file

resource name - shorthand:

* deployments - deploy,
* pods - po,
* replicasets - rs,
* services - svc,
* configmaps - cs,
* persistentvolumes - pv,
* persistentvolumesclaims - pvc,
* storageclasses - sc,
* secrets.

`kubectl get [TYPE = deploy | po | rs | svc | ... | all]` - display one, many or all resources

`kubectl describe [TYPE = deploy | po | rs | svc | ...] [NAME]` - show details of a specific resource or group of resources

`kubectl delete [TYPE] [NAME]` - delete resource

`kubectl delete ([-f FILENAME] | [-k DIRECTORY] | TYPE [(NAME | -l label | --all)]) [options]`

`kubectl logs [NAME]` - print the logs for a container in a pod or specified resource

`kubectl logs [-f] [-p] (POD | TYPE/NAME) [-c CONTAINER] [options]`

`kubectl scale --replicas=[COUNT] [TYPE] [NAME]` - set a new size for a Deployment, ReplicaSet, Replication Controller, or StatefulSet

`kubectl scale [--resource-version=version] [--current-replicas=count] --replicas=COUNT (-f FILENAME | TYPE NAME) [options]`

`kubectl replace -f [NAME]` - replace a resource by filename or stdin

`kubectl replace -f FILENAME [options]`

`kubectl exec -ti [POD_NAME] -- nslookup [SVC_NAME]`

## persistent volumes

Access modes:
- ReadWrtiteOnce,
- ReadOnlyMany,
- ReadWriteMany.
