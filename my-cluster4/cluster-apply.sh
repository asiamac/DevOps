#!/bin/sh

# run section when changes in backend folder
#cd backend
#sudo docker build -t jmackowiak/mybackendcluster .
#sudo docker push jmackowiak/mybackendcluster
#cd ..

# run section when changes in frontend folder
#cd frontend
#sudo docker build -t jmackowiak/myfrontendcluster .
#sudo docker push jmackowiak/myfrontendcluster
#cd ..

# section for minikube
#minikube start #only once
#minikube addons enable ingress #only once

# section for Mac and Windows
# kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml

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
