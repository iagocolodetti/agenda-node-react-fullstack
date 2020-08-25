const jwtUtil = require('../src/utils/jwtUtil');

const MOCK_ID = '1';
const MOCK_USERNAME = 'User';
const EXPIRATION = 900;

let TOKEN = '';

describe('utils', () => {
  describe('jwtUtil', () => {
    it('should generate a token', () => {
      TOKEN = jwtUtil.getToken(MOCK_ID, MOCK_USERNAME, EXPIRATION);
      expect(TOKEN).not.toBe(null);
    });

    it('should check if token is valid and return correct id', () => {
      const id = jwtUtil.getIdFromToken(TOKEN);
      expect(id).toBe(MOCK_ID);
    });

    it('should check if token expired correctly', (done) => {
      setTimeout(() => {
        try {
          done();
          jwtUtil.getIdFromToken(TOKEN);
        } catch (error) {
          expect(error.status).toBe(401);
        }
      }, 1000);
    });
  });
});
