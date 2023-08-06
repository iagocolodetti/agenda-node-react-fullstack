import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import storageAuth from '../../utils/storageAuth';
import actions from '../../actions';

function Logout() {

  const dispatch = useDispatch();

  function logout() {
    dispatch(actions.contactsActions.setContacts([]));
    storageAuth.clear();
  }

  return (
    <li className="nav-item">
      <Link className="nav-link" to="/login" onClick={logout}>Logout</Link>
    </li>
  );
}

export default Logout;
