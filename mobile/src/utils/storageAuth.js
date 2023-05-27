import AsyncStorage from '@react-native-community/async-storage';

const AUTH_KEY = 'agendaApiAuth';
const AUTH_ERROR_KEY = 'agendaApiAuthError';

async function setAuth(auth) {
  try {
    await AsyncStorage.setItem(AUTH_KEY, auth);
  } catch {
    throw 'Não foi possível consultar o armazenamento local.';
  }
}

async function getAuth() {
  try {
    return await AsyncStorage.getItem(AUTH_KEY);
  } catch {
    throw 'Não foi possível consultar o armazenamento local.';
  }
}

async function removeAuth() {
  try {
    await AsyncStorage.removeItem(AUTH_KEY);
  } catch {
    throw 'Não foi possível consultar o armazenamento local.';
  }
}

async function setAuthError(error) {
  try {
    await AsyncStorage.setItem(AUTH_ERROR_KEY, error);
  } catch {
    throw 'Não foi possível consultar o armazenamento local.';
  }
}

async function getAuthError() {
  try {
    return await AsyncStorage.getItem(AUTH_ERROR_KEY);
  } catch {
    throw 'Não foi possível consultar o armazenamento local.';
  }
}

async function removeAuthError() {
  try {
    await AsyncStorage.removeItem(AUTH_ERROR_KEY);
  } catch {
    throw 'Não foi possível consultar o armazenamento local.';
  }
}

async function clear() {
  try {
    await AsyncStorage.clear();
  } catch {
    throw 'Não foi possível consultar o armazenamento local.';
  }
}

const methods = {
  setAuth,
  getAuth,
  removeAuth,
  setAuthError,
  getAuthError,
  removeAuthError,
  clear
};

export default methods;
