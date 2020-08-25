const { Router } = require('express');

const UserController = require('../controllers/UserController');
const SessionController = require('../controllers/SessionController');
const ContactController = require('../controllers/ContactController');

const routes = Router();

routes.post('/users', UserController.create);
routes.post('/login', SessionController.create);

routes.post('/contacts', ContactController.create);
routes.get('/contacts', ContactController.read);
routes.put('/contacts/:id', ContactController.update);
routes.delete('/contacts/:id', ContactController.destroy);

module.exports = routes;
