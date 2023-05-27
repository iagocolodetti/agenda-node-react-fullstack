import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './styles.css';
import '../../bootstrap-float-label.min.css';

import DivAlert from '../../components/DivAlert';

import userService from '../../services/userService';

import storageAuth from '../../utils/storageAuth';

function NewUser() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (storageAuth.getAuth()) {
      navigate('/contacts');
    }
  }, [navigate]);

  async function submit(e) {
    e.preventDefault();
    setMessage(null);
    if (!username) {
      setMessage(<DivAlert message={'Erro: Preencha o campo destinado ao nome.'} alert={'alert-danger'} />);
    } else if (!password) {
      setMessage(<DivAlert message={'Erro: Preencha o campo destinado à senha.'} alert={'alert-danger'} />);
    } else if (!passwordConfirm) {
      setMessage(<DivAlert message={'Erro: Confirme a senha.'} alert={'alert-danger'} />);
    } else if (password !== passwordConfirm) {
      setMessage(<DivAlert message={'Erro: Senhas diferentes.'} alert={'alert-danger'} />);
    } else {
      setSubmitDisabled(true);
      try {
        await userService.create(username, password);
        setUsername('');
        setPassword('');
        setPasswordConfirm('');
        setMessage(<DivAlert message={`Usuário '${username}' cadastrado com sucesso.`} alert={'alert-success'} />);
      } catch (error) {
        setMessage(<DivAlert message={error.response ? `Erro: ${error.response.data.message}.` : 'Erro: Não foi possível cadastrar o usuário.'} alert={'alert-danger'} />);
      } finally {
        setSubmitDisabled(false);
      }
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center text-center">
        <div className="form-group col-xs-12 col-sm-10 col-md-8 col-lg-5">
          <h4 className="mb-3 text-muted">Novo Usuário</h4>
          <form className="card mb-4 justify-content-center" onSubmit={submit}>
            <div className="card-body">
              <label className="form-group has-float-label">
                <input className="form-control" type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Nome" required />
                <span>Nome</span>
              </label>
              <label className="form-group has-float-label">
                <input className="form-control" type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required />
                <span>Senha</span>
              </label>
              <label className="form-group has-float-label">
                <input className="form-control" type="password" id="passwordConfirm" name="passwordConfirm" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder="Confirme a Senha" required />
                <span>Confirme a Senha</span>
              </label>
              {message}
              <div className="d-flex justify-content-between">
                <Link className="nav-link" to="/login">Já possui uma conta? Faça o Login.</Link>
                <input type="submit" className="btn btn-primary btn-fix" value="Criar conta" disabled={submitDisabled} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewUser;
