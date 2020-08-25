import api from './api';

async function create(authorization, contact) {
  try {
    return await api.post('/contacts', JSON.stringify(contact), { headers: { 'Authorization': authorization } });
  } catch (error) {
    throw error;
  }
}

async function read(authorization) {
  try {
    return await api.get('/contacts', { headers: { 'Authorization': authorization } });
  } catch (error) {
    throw error;
  }
}

async function update(authorization, contact) {
  try {
    return await api.put(`/contacts/${contact.id}`, JSON.stringify(contact), { headers: { 'Authorization': authorization } });
  } catch (error) {
    throw error;
  }
}

async function destroy(authorization, id) {
  try {
    return await api.delete(`/contacts/${id}`, { headers: { 'Authorization': authorization } });
  } catch (error) {
    throw error;
  }
}


export default {
  create,
  read,
  update,
  destroy
};
