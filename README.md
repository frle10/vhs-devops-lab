### VHS

During implementation of the VHS Rental system, I assumed the following rules:

- there can be more than one VHS cassette for a particular movie available (so VHS model has a quantity field, which is a number), this means that the same VHS CAN be rented on the same date more than once, as long
  as the quantity is greater than 0 (this is validated on rent request)
- when the rental is created, its returned_at field is NULL at first, but upon returning a VHS, the user triggers an update PATCH method to that rental which sets the returned_at date and at the same time updates the late_fee if neccessary
- authentication has been implemented using JWT, so there is no logout route, just login and register

To start the app, you should clone this repo to your local machine and do the following in your terminal:

- position yourself to project directory
- run "yarn install" to install project dependencies
- run "docker compose up" to start a PostgreSQL database
- run "yarn start:dev:seed" to start the app in development mode and also seed the database on startup

In case you want to run e2e tests, you should first run the docker-compose.test.yml file because it will start a database that's just for testing:

- docker compose -f docker-compose.test.yml up
- yarn test:e2e

### Docker commands

Build Nexus server: docker build -t my-nexus-build -f Dockerfile.nexus .
Start Nexus server: docker run -d -p 18081:8081 -p 18082:8082 --name nexus --restart always -v nexus-data:/opt/nexus/sonatype-work my-nexus-build

Build VHS app: docker build -t vhs-app .
Run VHS app: docker run -d -p 3000:3000 --name vhs-app vhs-app

### Push VHS app to Nexus registry:

- docker login 127.0.0.1:18082
- docker tag vhs-rental 127.0.0.1:18082/vhs-rental:latest
- docker push 127.0.0.1:18082/vhs-rental:latest
