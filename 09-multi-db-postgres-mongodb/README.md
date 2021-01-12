## --- POSTGRES

docker run \
  --name postgres \
  -e POSTGRES_USER=usuario \
  -e POSTGRES_PASSWORD=senhasecreta \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker ps
docker exec -it postgres /bin/bash

docker run \
  --name adminer \
  -p 8080:8080 \
  --link postgres:postgres \
  -d \
  adminer

## --- MONGODB

docker run \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin \
  -d \
  mongo

docker run \
  --name mongoclient \
  -p 3000:3000 \
  --link mongodb:mongodb \
  -d \
  mongoclient/mongoclient

docker run -d -p 3003:3003 mongoclient/mongoclient

docker exec -it mongodb \
  mongo --host localhost -u admin admin --authenticationDatabase admin \
  --eval "db.getSiblingDB('herois').createUser({user: 'joao', pwd: 'suasenha', roles: [{role: 'readWrite', db: 'herois'}]})"