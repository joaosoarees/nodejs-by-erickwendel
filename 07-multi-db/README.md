## --- POSTGRES

docker run \
  --name erickpostgres \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=root \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker ps
docker exec -it postgres /bin/bash

docker run \
  --name adminer \
  -p 8080:8080 \
  --link erickpostgres:postgres \
  -d \
  adminer

## --- MONGODB

docker run \
  --name erickmongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=root \
  -d \
  mongo

docker run \
  --name mongoclient \
  -p 3000:3000 \
  --link erickmongodb:mongodb \
  -d \
  mongoclient/mongoclient

docker run -d -p 3003:3003 mongoclient/mongoclient

docker exec -it erickmongodb \
  mongo --host localhost -u root root --authenticationDatabase admin \
  --eval "db.getSiblingDB('herois').createUser({user: 'joao', pwd: 'root', roles: [{role: 'readWrite', db: 'herois'}]})"