const express = require('express');
require('express-async-errors');
const routes = require('./routes');
const { errorHandlerMiddleware } = require('./app/middlewares/ErrorHandlerMiddleware');
const SERVER_PORT = 3000;

const app = express();
app.use(express.json());
app.use(routes);
app.use(errorHandlerMiddleware);

app.listen(SERVER_PORT, () =>
    console.log(`Server started at http://localhost:${SERVER_PORT}`)
);
