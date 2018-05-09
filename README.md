# Node JS API
Simple node js api project with jwt authentication with mongodb.

## Instruction

This is assumed that npm, node and mongodb are installed on the machine.

 * node js >= 6.9.x
 * npm >= 3.x.x
 * mongodb >= 3.2.x
  
For installing node and npm please refer [here](https://nodejs.org/en/download/package-manager/).
For installing mongodb [here](https://docs.mongodb.com/manual/installation/).

## Installation and Run

 1. Clone the repository and move to cloned directory and hit:

    ```npm install```

    This will install all the dependencies for the project.

 2. To start the project hit:  

    ```
    node index.js
    ```
    or
    ```
    npm start
    ```

    This will start the project.

## Disable JWT

By commenting following line you can disabled JWT verification in index.js.

```
// app.use(expressJwt({secret: process.env.APP_SECRET}).unless(filter));
```
