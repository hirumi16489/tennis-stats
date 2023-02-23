#!/bin/bash

docker build -t hirumi16489/tennis-stats-client ./client
docker build -t hirumi16489/tennis-stats-nginx ./nginx
docker build -t hirumi16489/tennis-stats-server ./server

docker push hirumi16489/tennis-stats-client
docker push hirumi16489/tennis-stats-nginx
docker push hirumi16489/tennis-stats-server

scp -i ./terraform/dev-key-pair.pem docker-compose.yml ec2-user@$1:~/.