const bcrypt = require('bcrypt');

module.exports = {
  generate(text) {
    return bcrypt.hashSync(text, 10);
  },

  check(text, hash) {
    return bcrypt.compareSync(text, hash);
  }
}
