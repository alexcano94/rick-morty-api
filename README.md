# The Rick and Morty Character Library API

This project makes use of the API: [The Rick and Morty API](https://rickandmortyapi.com) to fetch chahracters, return them and keep track of favorites.

There is a `docker-compose.yml` with the database recipe.

Please run the following command to run the database BEFORE running the server:

`docker compose up`

## Available Scripts

In the project directory, you can run:

### `npm dev`

Runs the app in the development mode.\
The app will run on [http://localhost:8080](http://localhost:8080) on default.

### `npm test`

Launches the test suite.

### `npm run build`

Builds the app for production to the `dist` folder.


### `npm start`

Runs the app in prodcution mode.\
The app will run on [http://localhost:8080](http://localhost:8080) on default.

## Libaries and dependencies

### `rickmortyapi`
[The Rick and Morty API](https://rickandmortyapi.com) SDK for retrievnig the data.

### `mongodb`
MongoDB's typescript client library for interacting with MongoDB.

### `jsonwebtoken`
Package for creating and validating JSON web tokens.

### `bcrypt`
Utility for encrypting and decrypting passwords.

### `jest supertest superagent`
Framework for testing.

### `mongodb-memory-server`
Library for mocking database in testing environments.

### `dotenv`
Package for accessing environment variables.

### `axios`
Package for making HTTP requests.

### `cors`
Provides a middleware to enable CORS.

### `nodemon`
Package for hotreload on developing.

### `express-validator`
Package for validating body content on requests.

### `eslint` and configs
Library for linting code on development with an especific configuration.\
The style choosed is AirBnb's codde configuration.

