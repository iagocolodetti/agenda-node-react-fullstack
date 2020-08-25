const User = require('../models/User');

const hashGenerator = require('../utils/hashGenerator');

const JsonError = require('../errors/JsonError');

module.exports = {
  async create(request, response) {
    try {
      const { username, password } = request.body;
      if (!username || !password) {
        response.status(400);
        return response.send(JsonError(request, response, '\'username\' e \'password\' são obrigatórios no corpo da requisição'));
      }
      const hash = hashGenerator.generate(password)
      await User.create({ username: username.toLowerCase(), password: hash });
      response.sendStatus(201);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        response.status(409);
        response.json(JsonError(request, response, 'Usuário já existe'));
      } else {
        response.status(500);
        response.json(JsonError(request, response, 'Não foi possível criar o usuário'));
      }
    }
  }
};
