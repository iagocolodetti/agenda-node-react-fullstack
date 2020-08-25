const jwt = require('jsonwebtoken');

const AuthenticationError = require('../errors/AuthenticationError');

const JWT_SECRET = 'MeuSegredo123';
const JWT_TOKEN_PREFIX = 'Bearer';

module.exports = {
  getToken(id, username, expiration) {
    const dateNow = Math.floor(Date.now() / 1000);
    const token = jwt.sign({
      iss: 'agenda',
      jti: id,
      sub: username,
      iat: dateNow,
      exp: dateNow + (expiration / 1000)
    }, JWT_SECRET, { algorithm: 'HS512' });
    return `${JWT_TOKEN_PREFIX} ${token}`;
  },

  getIdFromToken(token) {
    if (token) {
      const _token = token.replace(`${JWT_TOKEN_PREFIX} `, '');
      let id;
      jwt.verify(_token, JWT_SECRET, (error, decoded) => {
        if (error) {
          switch (error.name) {
            case 'TokenExpiredError':
              throw new AuthenticationError(401, 'Token de autenticação expirado');
            case 'JsonWebTokenError':
              throw new AuthenticationError(401, 'Token de autenticação inválido');
          }
        } else {
          id = decoded.jti;
        }
      });
      return id;
    } else {
      throw new AuthenticationError(400, 'Token de autenticação não informado no cabeçalho');
    }
  }
};
