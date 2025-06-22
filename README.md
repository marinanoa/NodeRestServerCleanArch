## Introduction

This is a personal backend project used for practice.
It is based in NodeJS and Express and implements a clean architecture.

:construction: This project is under development. It misses tests, and other things.

## How to run

### Prerequisites:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm)

### Use the correct node version

Run the following command to install the [correct node version](.nvmrc):

```bash
nvm install
```

Run the following command to use that version:

```bash
nvm use
```

### Install dependencies

```bash
npm install
```

### Start database

You neede to have Docker Desktop open. Then run the following command:

```bash
docker compose up
```

### Run the application

```bash
npm run dev
```

It will be running in port 3100.

## Endpoints

### Register

Creates a user in the database.

Example:

```bash
curl --location 'http://localhost:3100/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
   "name": "Test",
    "email": "test@gmail.com",
    "password": "testpassword"
}'
```

### Login

Looks for a user in the database.

Example:

```bash
curl --location 'http://localhost:3100/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@gmail.com",
    "password": "testpassword"
}'
```

### List all users

You will need to get the \<TOKEN\> from the response of either the register or the login endpoint.

```bash
curl --location 'http://localhost:3100/api/auth/' \
--header 'Authorization: Bearer <TOKEN>'
```
