import React from 'react';
import { Link } from 'react-router-dom';

import storageAuth from '../../utils/storageAuth';

function Logout() {
  function logout() {
    storageAuth.clear();
  }

  return (
    <li className="nav-item">
      <Link className="nav-link" to="/login" onClick={logout}>Logout</Link>
    </li>
  );
}

export default Logout;
