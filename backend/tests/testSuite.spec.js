const request = require('supertest');
const app = require('../src/app');
const db = require('../src/database');

const User = require('../src/models/User');
const Contact = require('../src/models/Contact');
const Phone = require('../src/models/Phone');
const Email = require('../src/models/Email');

const MOCK_USER = {
  username: 'user',
  password: '12345'
};

let AUTHORIZATION = '';

let MOCK_CONTACT = {
  name: 'Name LastName',
  alias: 'Nickname',
  phone: [
    {
      phone: '1111-2222'
    },
    {
      phone: '3333-4444'
    }
  ],
  email: [
    {
      email: 'email1@gmail.com'
    },
    {
      email: 'email2@hotmail.com'
    },
    {
      email: 'email3@live.com'
    }
  ]
};

describe('controllers', () => {
  beforeAll(async () => {
    await db.connect();
    await Email.truncate({ restartIdentity: true });
    await Phone.truncate({ restartIdentity: true });
    await Contact.truncate({ restartIdentity: true });
    await User.truncate({ restartIdentity: true });
  });

  afterAll(async () => {
    await db.close();
  });

  describe('UserController', () => {
    it('should create a new user', async () => {
      const response = await request(app).post('/users').send(MOCK_USER);
      expect(response.status).toBe(201);
    });
  });

  describe('SessionController', () => {
    it('should create a new session', async () => {
      const response = await request(app).post('/login').send(MOCK_USER);
      expect(response.status).toBe(200);
      AUTHORIZATION = response.header.authorization;
      expect(AUTHORIZATION).not.toBe(null);
    });
  });

  describe('ContactController', () => {
    it('should create a new contact', async () => {
      const response = await request(app).post('/contacts').set('authorization', AUTHORIZATION).send(MOCK_CONTACT);
      MOCK_CONTACT = response.body;
      expect(response.status).toBe(201);
    });

    it('should read contact list', async () => {
      const response = await request(app).get('/contacts').set('authorization', AUTHORIZATION);
      expect(response.status).toBe(200);
      expect(response.body).not.toBe([]);
    });

    it('should update a contact', async () => {
      MOCK_CONTACT = { ...MOCK_CONTACT, alias: 'NewNickname' };
      MOCK_CONTACT.email[0] = { ...MOCK_CONTACT.email[0], deleted: true };
      MOCK_CONTACT.email[1] = { ...MOCK_CONTACT.email[1], email: 'email2@yahoo.com' };
      MOCK_CONTACT.email = [...MOCK_CONTACT.email, { email: 'email4@xyz.com' }];
      const response = await request(app).put(`/contacts/${MOCK_CONTACT.id}`).set('authorization', AUTHORIZATION).send(MOCK_CONTACT);
      expect(response.status).toBe(204);
    });

    it('should delete a contact', async () => {
      const response = await request(app).delete(`/contacts/${MOCK_CONTACT.id}`).set('authorization', AUTHORIZATION);
      expect(response.status).toBe(204);
    });
  });
});
