import sessionService from './sessionService';
import userService from './userService';

describe('services', () => {
  describe('sessionService', () => {
    beforeAll(async () => {
      try {
        await userService.create('user0', '12345');
      } catch {}
    });

    it('should create a new session', async () => {
      const response = await sessionService.create('user0', '12345');
      expect(response.status).toBe(200);
      expect(response.headers.authorization).not.toBeNull();
    });
  });
});
