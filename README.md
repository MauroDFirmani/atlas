# Atlas

Docker:

We will run the Postgres in a Docker container. Here is the link to get all packages necesaries to run this project https://docs.docker.com/compose/gettingstarted/

.ENV:

Here in the root folder of the project you will find an example of .env file called .env.example. Copy the file and rename it as .env

Run the project:

In order to run the project first of all you need to open a bash terminal, and move to the root of project and them run the command 'docker-compose up'. After that, you can run the project with following commands:
                                - npm run dev
                                - npm start*
*IMPORTANT! This command has the instruction 'set NODE_PATH=./build' it is for windows machine. If you have linux/mac replace 'set' for 'export'

Endpoints list:

    Create invoices register on db from scrapping
        - POST -> http://localhost:3000/api/invoices

    Get all invoices on db    
        - GET -> http://localhost:3000/api/invoices
    
    Status endpoint
        - GET -> http://localhost:3000/
 
