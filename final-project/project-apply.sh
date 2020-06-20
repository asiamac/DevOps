#!/bin/sh

cd backend
sudo docker build -t jmackowiak/mybackendproject .
sudo docker push jmackowiak/mybackendproject
cd ..

cd frontend
sudo docker build -t jmackowiak/myfrontendproject .
sudo docker push jmackowiak/myfrontendproject
cd ..

minikube start #only once
minikube addons enable ingress #only once

kubectl apply -f app-configmap.yml

kubectl apply -f redis-deployment.yml
kubectl apply -f redis-service-clusterip.yml

kubectl apply -f postgres-pvc.yml
kubectl apply -f postgres-secret.yml
kubectl apply -f postgres-deployment.yml
kubectl apply -f postgres-service-clusterip.yml

kubectl apply -f backend-deployment.yml
kubectl apply -f backend-service-clusterip.yml

kubectl apply -f frontend-deployment.yml
kubectl apply -f frontend-service-clusterip.yml

kubectl apply -f ingress-service.yml
