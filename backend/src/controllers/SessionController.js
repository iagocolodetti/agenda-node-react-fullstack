const User = require('../models/User');

const hashGenerator = require('../utils/hashGenerator');
const jwtUtil = require('../utils/jwtUtil');

const JsonError = require('../errors/JsonError');

module.exports = {
  async create(request, response) {
    try {
      const { username, password } = request.body;
      if (!username || !password) {
        response.status(400);
        return response.send(JsonError(request, response, '\'username\' e \'password\' são obrigatórios no corpo da requisição'));
      }
      const result = await User.findOne({ where: { username: username.toLowerCase() }, raw: true });
      if (result && hashGenerator.check(password, result.password)) {
        const dateNow = new Date().getTime();
        const expiration = 1000 * 60 * 60;
        response.setHeader('Authorization', jwtUtil.getToken(result.id, result.username, expiration));
        response.setHeader('Expires', new Date(dateNow + expiration).toGMTString());
        response.sendStatus(200);
      } else {
        response.status(404);
        response.json(JsonError(request, response, 'Usuário não encontrado ou senha incorreta'));
      }
    } catch (error) {
      response.status(500);
      response.json(JsonError(request, response, 'Não foi possível efetuar o login'));
    }
  }
};
