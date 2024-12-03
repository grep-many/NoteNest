# NoteNest | Personal Notes App



NoteNest is a simple, easy-to-use personal notes application built with a client-server architecture. It allows users to manage their notes efficiently.



## Prerequisites



Make sure you have the following installed:



- Node.js

- npm (Node Package Manager)



## Installation



To get started, clone this repository and install the dependencies for both the **client** and **server**.



### Steps to set up the client:



1. Open a terminal and navigate to the `client` directory:

    ```bash

    cd client

    ```



2. Install the dependencies:

    ```bash

    npm install

    ```



3. Create a `.env` file in the `client` directory with the following configuration:

    ```env

    # The base URL of the backend server for the React application

    REACT_APP_HOST=http://localhost:5000

    ```



4. Run the client application:

    ```bash

    npm start

    ```

   This will start the client application in development mode.



### Steps to set up the server:



1. Open a new terminal window and navigate to the `server` directory:

    ```bash

    cd server

    ```



2. Install the server dependencies:

    ```bash

    npm install

    ```



3. Create a `.env` file in the `server` directory with the following configuration:

    ```env

    # URI for connecting to the MongoDB database

    DATABASE_URI=mongodb://localhost:27017/NoteNest



    # Port number on which the application will run

    PORT=5000



    # A random value used for salting sensitive data like passwords (must remain secret and unique)

    PEPPER=super_secure_random_value



    # Secret key used for signing and verifying JWTs (must remain secret and unique)

    JWT_SECRET=super_secret_jwt_key

    ```



4. Run the server application:

    ```bash

    npm run dev

    ```

   This will start the server application in development mode.



## Accessing the App



Once both the client and server are running, you can access the app by opening the following URL in your browser:



[http://localhost:3000](http://localhost:3000)



## Additional Information



- The client and server are separate applications. Make sure to run both to use the app.

- The client app runs on `http://localhost:3000` and communicates with the server at the base URL specified in the `.env` file.

- The server interacts with the MongoDB database using the URI specified in the `.env` file.
