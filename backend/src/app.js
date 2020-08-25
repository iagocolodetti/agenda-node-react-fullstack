const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const corsConfig = require('./configs/cors');

const app = express();

app.use(cors(corsConfig));
app.use(express.json());

app.use(routes);

module.exports = app;
