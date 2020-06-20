#!/bin/sh
kubectl delete ingress my-ingress-service

kubectl delete svc my-frontend-service
kubectl delete deploy my-frontend-deployment

kubectl delete svc my-backend-service
kubectl delete deploy my-backend-deployment

kubectl delete svc my-postgres-service
kubectl delete deploy my-postgres-deployment
kubectl delete secret my-postgres-secret
kubectl delete pvc my-postgres-pvc

kubectl delete svc my-redis-service
kubectl delete deploy my-redis-deployment

kubectl delete configmap my-app-config
