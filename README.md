# Grocery Booking
Grocery Booking API, using Node.js with the Express framework.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [API Documentation](#api-documentation)

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node](https://nodejs.org/en/download/package-manager)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. **Clone the repository**:
    ```sh
    https://github.com/Safalm74/QuestionPro-Grocery-Booking-API
    cd QuestionPro-Grocery-Booking-API
    ```

2. **Install dependencies**:
    Ensure you are in the project root directory and run:
    ```sh
    npm install
    ```
3. **Run development server**:
   ```sh
   npm start
 

## Configuration

1. **Environment Variables**:
    Create a `.env` file in the project root directory and configure the necessary environment variables. Refer to the `.env.example` file for required variables.
    *For Example:*
     ```sh
        PORT=8000

        JWT_SECRET='secret'

        DB_CLIENT='pg'
        DB_HOST='postgres'
        DB_USER='postgres'
        DB_PW='postgres'
        DB_PORT=5432
        DB_NAME='postgres'

        PGADMIN_MAIL="pgadmin@mail.com"
        PGADMIN_PW="pgadmin_password"
    ```


2. **Docker Compose**:
    The `docker-compose.yml` file is already configured to set up the necessary services (server and PostgreSQL). Adjust the configuration as needed using .env.

## Running the Application

1. **Build and start the services**:
    ```sh
    docker-compose up 
    ```

2. **Stop the services**:
    ```sh
    docker-compose down
    ```

## Usage

You can interact with the backend once the services are up and running.

## API Documentation    

This project uses [Swagger](https://swagger.io/) to generate interactive API documentation.

Once the application is up and running, you can view the API documentation by navigating to:
http://localhost:${PORT}/api-docs

