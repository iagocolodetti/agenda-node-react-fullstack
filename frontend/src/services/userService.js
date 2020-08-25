import api from './api';

async function create(username, password) {
  try {
    return await api.post('/users', { username, password });
  } catch (error) {
    throw error;
  }
}

export default {
  create
}
