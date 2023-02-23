#!/bin/bash
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -aG docker ec2-user
sudo pip3 install docker-compose
sudo yum install amazon-ecr-credential-helper