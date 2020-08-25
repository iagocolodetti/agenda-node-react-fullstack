import contactService from './contactService';
import userService from './userService';
import sessionService from './sessionService';

let AUTHORIZATION = '';

const MOCK_CONTACT = {
  name: 'Name1',
  alias: 'Alias1',
  phone: [
    {
      phone: '1111-1111'
    },
    {
      phone: '2222-2222'
    }
  ],
  email: [
    {
      email: 'email@gmail.com'
    },
    {
      email: 'email@hotmail.com'
    }
  ]
};

let LAST_CONTACT = null;

describe('services', () => {
  describe('contactService', () => {
    beforeAll(async () => {
      try {
        await userService.create('user0', '12345');
      } catch {}
      try {
        const response = await sessionService.create('user0', '12345');
        AUTHORIZATION = response.headers.authorization;
      } catch {}
    });

    it('should create a new contact', async () => {
      const response = await contactService.create(AUTHORIZATION, MOCK_CONTACT);
      expect(response.status).toBe(201);
    });

    it('should read contact list', async () => {
      const response = await contactService.read(AUTHORIZATION);
      LAST_CONTACT = response.data.slice(-1)[0];
      expect(response.status).toBe(200);
    });

    it('should update a contact', async () => {
      const response = await contactService.update(AUTHORIZATION, LAST_CONTACT);
      expect(response.status).toBe(204);
    });

    it('should delete a contact', async () => {
      const response = await contactService.destroy(AUTHORIZATION, LAST_CONTACT.id);
      expect(response.status).toBe(204);
    });
  });
});
