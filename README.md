# **PRODUCT ENTITY BACKEND SERVER**

### **Setup Instructions**

- Git clone repo
- Install Node.js version **14.17.6** 
- Install ts-node version **8.10.2**
- Inside repo run command **npm install**
- Create a **.env** file inside app root directory (check file format for details)
- Run command **npm start** to start the server
- Run command **npm run test** for testing.

### **.ENV file format**

```
PORT=3000
ENV=local
```
### **Server Directory Structure**
The server is build using Node.js using express.js framework.\
Using typescript\
**Model-Routes-Controllers-Services Directory Structure**\
For modular code structure the logic is divided into these directories and files.
```
├───models
│   products.model.ts
├───routes
│   products.route.ts
├───services
│   products.service.ts
│   state.service.ts
├───controllers
│   products.controller.ts

```
- **Models** - The definition of the Model/Interface
- **Routes** - The API routes maps to the Controllers
- **Controllers** - The controllers handles all the logic behind validating request parameters, query, Sending Responses with correct codes.
- **Services** - The services contains the database queries and returning objects or throwing errors

### **Additional Directory Structure**
**test** - Contains all the available test. Using mocha.js, supertest and chai.\
Current included type of test are integration tests.
