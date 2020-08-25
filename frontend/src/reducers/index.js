import contact from './contact';
import contacts from './contacts';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  contact,
  contacts
});

export default rootReducer;
