import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './styles.css';
import '../../bootstrap-float-label.min.css';

import DivAlert from '../../components/DivAlert';

import sessionService from '../../services/sessionService';

import storageAuth from '../../utils/storageAuth';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authorization, setAuthorization] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (storageAuth.getAuth()) {
      navigate('/contacts');
    } else {
      const error = storageAuth.getAuthError();
      if (error) {
        setMessage(<DivAlert message={`Erro: ${error}.`} alert={'alert-danger'} />);
        storageAuth.removeAuthError();
      }
    }
  }, [authorization, navigate]);

  async function submit(e) {
    e.preventDefault();
    setMessage(null);
    if (!username) {
      setMessage(<DivAlert message={'Erro: Preencha o campo destinado ao nome.'} alert={'alert-danger'} />);
    } else if (!password) {
      setMessage(<DivAlert message={'Erro: Preencha o campo destinado à senha.'} alert={'alert-danger'} />);
    } else {
      setSubmitDisabled(true);
      try {
        const response = await sessionService.create(username, password);
        const { authorization } = response.headers;
        storageAuth.setAuth(authorization);
        setAuthorization(authorization);
      } catch (error) {
        setMessage(<DivAlert message={error.response ? `Erro: ${error.response.data.message}.` : 'Erro: Não foi possível fazer login.'} alert={'alert-danger'} />);
      } finally {
        setSubmitDisabled(false);
      }
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center text-center">
        <div className="form-group col-xs-12 col-sm-10 col-md-8 col-lg-5">
          <h4 className="mb-3 text-muted">Login</h4>
          <form className="card mb-4 justify-content-center" onSubmit={submit}>
            <div className="card-body">
              <label className="form-group mb-2 has-float-label">
                <input className="form-control" type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Nome" required />
                <span>Nome</span>
              </label>
              <label className="form-group mb-3 has-float-label">
                <input className="form-control" type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required />
                <span>Senha</span>
              </label>
              {message}
              <div className="d-flex justify-content-between">
                <Link className="nav-link" to="/new">Criar conta</Link>
                <input type="submit" className="btn btn-primary btn-fix" value="Login" disabled={submitDisabled} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
