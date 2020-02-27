# comments-api

A simple NodeJS REST API service for creating and reading infinitely-nested comments.

## Quick Start

There are two options for running the service locally:

1. Manually run mongodb and nodejs service
2. Run using docker via `docker-compose`

### 1. Run manually

Open terminal and run mongodb daemon
```bash
# start mongo daemon in separate terminal
mongod --dbpath ~/path/to/your/volume
```

Open separate terminal and run comments-api service
```bash
# cd into project
cd ~/path/to/comments-api

# install project dependencies
npm install

# run service
npm start
```

### 2. Run with docker

Open terminal
```bash
# cd into project
cd ~/path/to/comments-api

# build project
npm build

# start via docker-compose
docker-compose up --build
```

## Stuff to talk about

### Fetch Comments
- pagination
- pipeline building

### Fetch Single
- `ensureDataExists` middleware for 404 check
- recursive pipeline
    - nested sorting + limit
- why to avoid $graphLookup

### Create Single
- validation middleware
- `ensureDataExists` middleware for referential integrity check

### General
- MongoDB Compass

## Todo
- docker compose?
- indexes
- docs for APIs
