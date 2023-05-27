const { config } = require('dotenv');
const { join } = require('path');

config({ path: join(__dirname, '../config/', `.${process.env.NODE_ENV}`) });
