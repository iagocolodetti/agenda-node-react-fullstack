const database = require('../database');

const Contact = require('../models/Contact');
const Phone = require('../models/Phone');
const Email = require('../models/Email');

const jwtUtil = require('../utils/jwtUtil');

const JsonError = require('../errors/JsonError');

module.exports = {
  async create(request, response) {
    try {
      const user_id = jwtUtil.getIdFromToken(request.headers['authorization']);
      let transaction;
      try {
        transaction = await database.getTransaction();
        const { name, alias, phone, email } = request.body;
        const result = await Contact.create({ name, alias, phone, email, user_id }, {
          include: [{
            model: Phone,
            as: Phone.tableName
          },{
            model: Email,
            as: Email.tableName
          }],
          transaction
        });
        await transaction.commit();
        response.status(201);
        response.json(result.get({ plain: true }));
      } catch {
        if (transaction) {
          await transaction.rollback();
        }
        response.status(500);
        response.json(JsonError(request, response, 'Não foi possível cadastrar o contato'));
      }
    } catch (error) {
      response.status(error.status);
      response.json(JsonError(request, response, error.message));
    }
  },

  async read(request, response) {
    try {
      const user_id = jwtUtil.getIdFromToken(request.headers['authorization']);
      let { page, size } = request.query;
      if (!page || page < 0) {
        page = null;
        size = null;
      } else {
        size = (!size || size < 1) ? 10 : parseInt(size);
        page = page * size;
      }
      try {
        const result = (await Contact.findAll({
          where: {
            user_id,
            deleted: false
          },
          offset: page,
          limit: size,
          raw: false
        })).map(contact => contact.get({ plain: true }));
        response.json(result);
      } catch {
        response.status(500);
        response.json(JsonError(request, response, 'Não foi possível buscar os contatos'));
      }
    } catch (error) {
      response.status(error.status);
      response.json(JsonError(request, response, error.message));
    }
  },

  async update(request, response) {
    try {
      const user_id = jwtUtil.getIdFromToken(request.headers['authorization']);
      const { id: contact_id } = request.params;
      let transaction;
      try {
        transaction = await database.getTransaction();
        const { name, alias, phone, email } = request.body;
        const result = await Contact.findOne({
          where: {
            id: contact_id,
            user_id
          },
          raw: false
        });
        if (result) {
          await Promise.all(phone.map(async p => {
            await Phone.upsert({
              id: p.id,
              phone: p.phone,
              contact_id,
              deleted: p.deleted
            }, { transaction });
          }));
          await Promise.all(email.map(async e => {
            await Email.upsert({
              id: e.id,
              email: e.email,
              contact_id,
              deleted: e.deleted
            }, { transaction });
          }));
          await result.update({ name, alias }, { transaction });
          await transaction.commit();
          response.sendStatus(204);
        } else {
          response.status(404);
          response.json(JsonError(request, response, 'Contato não encontrado'));
        }
      } catch {
        if (transaction) {
          await transaction.rollback();
        }
        response.status(500);
        response.json(JsonError(request, response, 'Não foi possível atualizar o contato'));
      }
    } catch (error) {
      response.status(error.status);
      response.json(JsonError(request, response, error.message));
    }
  },

  async destroy(request, response) {
    try {
      const user_id = jwtUtil.getIdFromToken(request.headers['authorization']);
      try {
        const result = await Contact.findOne({
          where: {
            id: request.params.id,
            user_id,
            deleted: false
          }
        });
        if (result) {
          await result.update({ deleted: true });
          response.sendStatus(204);
        } else {
          response.status(404);
          response.json(JsonError(request, response, 'Contato não encontrado'));
        }
      } catch {
        response.status(500);
        response.json(JsonError(request, response, 'Não foi possível excluir o contato'));
      }
    } catch (error) {
      response.status(error.status);
      response.json(JsonError(request, response, error.message));
    }
  }
};
