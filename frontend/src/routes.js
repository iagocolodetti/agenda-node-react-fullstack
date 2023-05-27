import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import NewUser from './pages/newUser';
import Main from './pages/main';

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/new" element={<NewUser/>} />
        <Route path="/contacts" element={<Main/>} />
      </Routes>
    </BrowserRouter>
  );
}
