const hashGenerator = require('../src/utils/hashGenerator');

const MOCK_PASSWORD = '1234567890';

let HASH = '';

describe('utils', () => {
  describe('hashGenerator', () => {
    it('should generate a hash', () => {
      HASH = hashGenerator.generate(MOCK_PASSWORD);
      expect(HASH).not.toEqual(MOCK_PASSWORD);
      expect(HASH.length).toBe(60);
    });

    it('should check if hash and password are compatible', () => {
      const check = hashGenerator.check(MOCK_PASSWORD, HASH);
      expect(check).toBe(true);
    });

    it('should check if hash and a wrong password are not compatible', () => {
      const check = hashGenerator.check('0987654321', HASH);
      expect(check).toBe(false);
    });
  });
});
