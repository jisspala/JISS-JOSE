## Media Search

This is a simple media search application that provides a REST API to books from google books and albums from apple.
![enter image description here](https://github.com/jisspala/JISS-JOSE/blob/dev/doc/doc.png)

## Installation

1.  Clone the repository
2.  Run the application with `docker-compose up`

## Usage

You can access the Swagger GUI to try out the API by visiting `http://localhost:3000/api-docs/`.

### Endpoints

- `GET /v1/media`: search books and albums - Query parameter : **q** - "search term" - Response : It will be a array of books and albums - Response_Headers ` x-albums-api-response-time` and `x-books-api-response-time` are two headers which giving the downstream apis response time
- `GET v1/health`: Get all health details and response times of downstream apis

## Run and Test in Local

1.  Install all dependencies : `npm install`
2.  Start server in Dev mode : `npm run dev`
3.  Swagger doc will be available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Technical overview

**Node.js** with **TypeScript** is chosen for this service because it is a fast and lightweight platform that is well-suited for building web services. The use of TypeScript adds an extra layer of type safety and makes the code more maintainable. **Express.js** was chosen as the web framework because it is a mature and popular framework that is easy to use and provides a lot of useful features out of the box. **Axios** was chosen for making HTTP requests to the external APIs because it is a widely used library that provides a simple and powerful API for making HTTP requests.For the testing , we are using **jest and supertest**.
To generate API docs and test APIs by manual we are using **Swagger**
In this project, we use **Docker** and **Docker Compose** to package and deploy our Node.js application and its dependencies in a **containerized** environment. This allows us to easily run the application on any platform that supports Docker, without worrying about dependencies or conflicts.

## Additional Tools and Libraries

The service uses the following additional tools and libraries:

### ESLint

ESLint is a popular JavaScript linter that helps maintain code quality and consistency. The service uses ESLint to enforce code quality and consistency.

### Pino

Pino is a fast and low-overhead logger for Node.js. The service uses Pino for logging.

### Joi

Joi is a powerful schema validation library for JavaScript. The service uses Joi for validating request query.

### Dotenv

To manage different environments we are using dotenv
