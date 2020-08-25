const AUTH_KEY = 'agendaApiAuth';
const AUTH_ERROR_KEY = 'agendaApiAuthError';

function setAuth(auth) {
  localStorage.setItem(AUTH_KEY, auth);
}

function getAuth() {
  return localStorage.getItem(AUTH_KEY);
}

function removeAuth() {
  localStorage.removeItem(AUTH_KEY);
}

function setAuthError(error) {
  localStorage.setItem(AUTH_ERROR_KEY, error);
}

function getAuthError() {
  return localStorage.getItem(AUTH_ERROR_KEY);
}

function removeAuthError() {
  localStorage.removeItem(AUTH_ERROR_KEY);
}

function clear() {
  localStorage.clear();
}

export default {
  setAuth,
  getAuth,
  removeAuth,
  setAuthError,
  getAuthError,
  removeAuthError,
  clear
};
