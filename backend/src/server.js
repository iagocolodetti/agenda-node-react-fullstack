const app = require('./app');
const db = require('./database');
const { join } = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

db.connect();

const swaggerDocument = YAML.load(join(__dirname, './configs/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8080, () => {
  console.log('Servidor rodando na porta: 8080');
});
