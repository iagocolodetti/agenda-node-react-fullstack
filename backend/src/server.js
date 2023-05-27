const { config } = require('dotenv');
const { ok } = require('assert');
const { join } = require('path');

config({ path: join(__dirname, '../config/', `.${process.env.NODE_ENV}`) });
ok(process.env.NODE_ENV === 'env.development', 'env inválido.');

const app = require('./app');
const db = require('./database');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

db.connect();

const swaggerDocument = YAML.load(join(__dirname, './configs/swagger.yaml'));
app.use(`${process.env.SV_API_DOCS}`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.SV_PORT, () => {
  console.log(`Servidor rodando na porta: ${process.env.SV_PORT}`);
  console.log(`Documentação: '${process.env.SV_API_DOCS}'`);
});
