const request = require('supertest');
const app = require('../src/app');
const database = require('../src/database');

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
  phone: [{
    phone: '1111-2222'
  },{
    phone: '3333-4444'
  },{
    phone: '6666-8888'
  },{
    phone: '5555-2222'
  }],
  email: [{
    email: 'email1@gmail.com'
  },{
    email: 'email2@hotmail.com'
  },{
    email: 'email3@live.com'
  }]
};

describe('controllers', () => {
  beforeAll(async () => {
    await database.connect();
    await Email.truncate({ restartIdentity: true });
    await Phone.truncate({ restartIdentity: true });
    await Contact.truncate({ restartIdentity: true });
    await User.truncate({ restartIdentity: true });
  });

  afterAll(async () => {
    await database.close();
  });

  describe('UserController', () => {
    it('should create a new user', async () => {
      const response = await request(app).post('/users').send(MOCK_USER);
      expect(response.status).toBe(201);
    });

    describe('should fail to create a new user', () => {
      it('unique validation', async () => {
        const response = await request(app).post('/users').send(MOCK_USER);
        expect(response.status).toBe(409);
      });

      it('username validation', async () => {
        const user = { username: 'Aa', password: '12345' };
        const response = await request(app).post('/users').send(user);
        expect(response.status).toBe(400);
      });

      it('password validation', async () => {
        const user = { username: 'NewUser', password: '12' };
        const response = await request(app).post('/users').send(user);
        expect(response.status).toBe(400);
      });
    });
  });

  describe('SessionController', () => {
    it('should create a new session', async () => {
      const response = await request(app).post('/login').send(MOCK_USER);
      expect(response.status).toBe(200);
      AUTHORIZATION = response.header.authorization;
      expect(AUTHORIZATION).not.toBe(null);
    });

    describe('should fail to create a new session', () => {
      it('user does not exist', async () => {
        const user = { username: 'aaaaaa', password: 'aaaaaa' };
        const response = await request(app).post('/login').send(user);
        expect(response.status).toBe(404);
      });

      it('incorrect password', async () => {
        const user = structuredClone(MOCK_USER);
        user.password = '11111';
        const response = await request(app).post('/login').send(user);
        expect(response.status).toBe(404);
      });
    });
  });

  describe('ContactController', () => {
    describe('should fail to create a new contact', () => {
      it('name validation', async () => {
        const contact = structuredClone(MOCK_CONTACT);
        contact.name = 'aa';
        const response = await request(app).post('/contacts').set('authorization', AUTHORIZATION).send(contact);
        expect(response.status).toBe(400);
      });

      it('alias validation', async () => {
        const contact = structuredClone(MOCK_CONTACT);
        contact.alias = 'aa';
        const response = await request(app).post('/contacts').set('authorization', AUTHORIZATION).send(contact);
        expect(response.status).toBe(400);
      });

      it('phone validation', async () => {
        const contact = structuredClone(MOCK_CONTACT);
        contact.phone = [...contact.phone, { phone: '11' }];
        const response = await request(app).post('/contacts').set('authorization', AUTHORIZATION).send(contact);
        expect(response.status).toBe(400);
      });

      it('e-mail validation', async () => {
        const contact = structuredClone(MOCK_CONTACT);
        contact.email = [...contact.email, { email: 'aaa@aaa' }];
        const response = await request(app).post('/contacts').set('authorization', AUTHORIZATION).send(contact);
        expect(response.status).toBe(400);
      });
    });

    it('should create a new contact', async () => {
      const response = await request(app).post('/contacts').set('authorization', AUTHORIZATION).send(MOCK_CONTACT);
      expect(response.status).toBe(201);
      const contact = response.body;
      expect(contact.name).toEqual(MOCK_CONTACT.name);
      expect(contact.alias).toEqual(MOCK_CONTACT.alias);
      expect(contact.phone.length).toBe(MOCK_CONTACT.phone.length);
      MOCK_CONTACT.phone.map(p => {
        expect(contact.phone.some(_p => _p.phone === p.phone)).toBeTruthy();
      });
      expect(contact.email.length).toBe(MOCK_CONTACT.email.length);
      MOCK_CONTACT.email.forEach(e => {
        expect(contact.email.some(_e => _e.email === e.email)).toBeTruthy();
      });
      MOCK_CONTACT = structuredClone(contact);
    });

    it('should read contact list', async () => {
      const response = await request(app).get('/contacts').set('authorization', AUTHORIZATION);
      expect(response.status).toBe(200);
      expect(response.body).not.toBe([]);
    });

    describe('Pagination', () => {
      it('should read contact list and page one must have one item', async () => {
        const response = await request(app).get('/contacts').set('authorization', AUTHORIZATION).query({ page: 0, size: 1 });
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
      });
  
      it('should read contact list and page two must be empty', async () => {
        const response = await request(app).get('/contacts').set('authorization', AUTHORIZATION).query({ page: 1, size: 1 });
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);
      });
    });

    it('should update a contact', async () => {
      MOCK_CONTACT = { ...MOCK_CONTACT, alias: 'NewNickname' };
      MOCK_CONTACT.email[0] = { ...MOCK_CONTACT.email[0], deleted: true };
      const deletedEmail = MOCK_CONTACT.email[0].email;
      MOCK_CONTACT.email[1] = { ...MOCK_CONTACT.email[1], email: 'email2@yahoo.com' };
      MOCK_CONTACT.email = [...MOCK_CONTACT.email, { email: 'email4@xyz.com' }];
      const response = await request(app).put(`/contacts/${MOCK_CONTACT.id}`).set('authorization', AUTHORIZATION).send(MOCK_CONTACT);
      expect(response.status).toBe(204);
      const contacts = (await request(app).get('/contacts').set('authorization', AUTHORIZATION)).body;
      const contact = contacts.find(c => c.id === MOCK_CONTACT.id);
      expect(contact).not.toBe(undefined);
      if (contact) {
        expect(contact.alias).toEqual(MOCK_CONTACT.alias);
        expect(contact.email.length).toBe(3);
        expect(contact.email.some(e => e.email === deletedEmail)).toBeFalsy();
        expect(contact.email.some(e => e.email === 'email2@yahoo.com')).toBeTruthy();
        expect(contact.email.some(e => e.email === 'email4@xyz.com')).toBeTruthy();
      }
    });

    it('should delete a contact', async () => {
      const response = await request(app).delete(`/contacts/${MOCK_CONTACT.id}`).set('authorization', AUTHORIZATION);
      expect(response.status).toBe(204);
    });
  });
});
