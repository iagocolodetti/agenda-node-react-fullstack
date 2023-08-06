const User = require('../models/User');
const { ValidationError } = require('sequelize');

const JsonError = require('../errors/JsonError');

module.exports = {
  async create(request, response) {
    try {
      const { username, password } = request.body;
      if (!username || !password) {
        response.status(400);
        return response.send(JsonError(request, response, '\'username\' e \'password\' são obrigatórios no corpo da requisição'));
      }
      await User.create({ username, password });
      response.sendStatus(201);
    } catch (error) {
      if (error instanceof ValidationError) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          response.status(409);
          response.json(JsonError(request, response, 'Usuário já existe'));
        } else {
          response.status(400);
          response.json(JsonError(request, response, error.message.replace('Validation error: ', '')));
        }
      } else {
        response.status(500);
        response.json(JsonError(request, response, 'Não foi possível criar o usuário'));
      }
    }
  }
};
