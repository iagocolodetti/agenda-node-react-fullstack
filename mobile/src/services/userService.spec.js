import userService from './userService';

describe('services', () => {
  describe('userService', () => {
    it('should create a new user', async () => {
      const randomNumber = Math.floor(Math.random() * 100000) + 1;
      const response = await userService.create('user' + randomNumber, '12345');
      expect(response.status).toBe(201);
    });
  });
});
