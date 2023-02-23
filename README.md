# Tennis Stat

Frontend public url : http://ec2-15-237-138-228.eu-west-3.compute.amazonaws.com/

Backend public url: http://ec2-15-237-138-228.eu-west-3.compute.amazonaws.com/api/  

Api routes:
  - GET /api/players
  - GET /api/players/:id

> Note: https is unsecure due to self signed certificate, unfortunatly I do not have a configured domain on AWS \
> in order to generate it with a certificate authority

<br />
<br />
<br />

# Local Installation

## Requierements

- docker
- docker-compose

## Usage

While in project root folder:

```
docker-compose -f docker-compose-dev.yml up -d --build
```

> Note: both node.js and react.js applications are being hotreload on code changes.


# Tests

## frontend

```
docker build -t docker-client -f Dockerfile.dev .
docker run -e CI=true -t docker-client npm run test
```

## backend

```
docker build -t docker-server -f Dockerfile.dev .
docker run -t docker-server npm run test
```

# Deployment

## Requierements
- AWS CLI
- Docker
- Terraform

> Note: You must be logged in with AWS cli and docker

## Usage

Deployement is made with terraform for EC2 provisioning \
Then a script is used to build and push docker image on a registry and copy a docker compose file in EC2 instance \
Finally manual connection to EC2 instance using SSH is requiered to run docker-compose command

> Note: terraform apply with output EC2 public URI and generate a key pair to connect to EC2 instance using ssh
> /!\ the generated key pair is supposed to be ignored by the gitignore, make sure to never push it !

```
cd terraform
terraform plan
terraform apply
cd ..
./build-and-push.sh <EC2_INSTANCE_PUBLIC_URI>
```

Wait a few minute that EC2 instance is up and ready

```
cd terraform
ssh -i "dev-key-pair.pem" ec2-user@<EC2_INSTANCE_PUBLIC_URI>
docker-compose up -d --build
```