import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../actions';

import './styles.css';
import '../../bootstrap-float-label.min.css';

import DivAlert from '../../components/DivAlert';

import contactService from '../../services/contactService';

import storageAuth from '../../utils/storageAuth';

function FormContact() {
  const history = useHistory();

  const authorization = storageAuth.getAuth();

  const contact = useSelector(state => state.contact);

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [alias, setAlias] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phones, setPhones] = useState([]);
  const [emails, setEmails] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setMessage(null);
    setPhone('');
    setEmail('');
    if (contact === null) {
      setName('');
      setAlias('');
      setPhones([]);
      setEmails([]);
    } else {
      setName(contact.name ? contact.name : '');
      setAlias(contact.alias ? contact.alias : '');
      setPhones(contact.phone ? contact.phone : []);
      setEmails(contact.email ? contact.email : []);
    }
  }, [contact]);

  function addPhone(e) {
    e.preventDefault();
    if (phone.length > 0) {
      setPhones([...phones, {
        'id': phones.length === 0 ? 0 : phones[phones.length - 1].id + 1,
        'phone': phone
      }]);
      setPhone('');
    }
  }

  function deletePhone(e) {
    e.preventDefault();
    const phone = JSON.parse(e.currentTarget.value);
    if (contact === null) {
      setPhones(phones.filter(p => p.id !== phone.id));
    } else {
      setPhones([...phones.filter(p => p.id !== phone.id), { ...phone, deleted: true }]);
    }
  }

  function phoneList() {
    if (phones.length > 0) {
      return (
        <>
          <h6 className="card-subtitle mb-1 text-muted">Telefone(s)</h6>
          <ul className="list-group text-center mb-2">
            {phones.map(p => p.deleted === undefined || p.deleted === false ? (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={p.id}>
                {p.phone}
                <button className="btn btn-outline-danger btn-sm" value={JSON.stringify(p)} onClick={deletePhone}>
                  <span className="fa fa-trash" />
                </button>
              </li>
            ) : null)}
          </ul>
        </>
      );
    } else return null;
  }

  function addEmail(e) {
    e.preventDefault();
    if (email.length > 0) {
      setEmails([...emails, {
        'id': emails.length === 0 ? 0 : emails[emails.length - 1].id + 1,
        'email': email
      }]);
      setEmail('');
    }
  }

  function deleteEmail(e) {
    e.preventDefault();
    const email = JSON.parse(e.currentTarget.value);
    if (contact === null) {
      setEmails(emails.filter(e => e.id !== email.id));
    } else {
      setEmails([...emails.filter(e => e.id !== email.id), { ...email, deleted: true }]);
    }
  }

  function emailList() {
    if (emails.length > 0) {
      return (
        <>
          <h6 className="card-subtitle mb-1 text-muted">E-mail(s)</h6>
          <ul className="list-group text-center mb-2">
            {emails.map(e => e.deleted === undefined || e.deleted === false ? (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={e.id}>
                {e.email}
                <button className="btn btn-outline-danger btn-sm" value={JSON.stringify(e)} onClick={deleteEmail}>
                  <span className="fa fa-trash" />
                </button>
              </li>
            ) : null)}
          </ul>
        </>
      );
    } else return null;
  }

  function buttonClearOrCancel() {
    const text = contact === null ? 'Limpar' : 'Cancelar';
    return (<button className="btn btn-secondary btn-fix" onClick={handleClearOrCancel} disabled={submitDisabled}>{text}</button>);
  }

  function handleClearOrCancel(e) {
    e.preventDefault();
    if (contact === null) {
      setName('');
      setAlias('');
      setPhones([]);
      setPhone('');
      setEmails([]);
      setEmail('');
    } else {
      dispatch(actions.contactActions.setContact(null));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (name.length === 0) {
      setMessage(<DivAlert message={'Erro: Preencha o campo destinado ao nome.'} alert={'alert-danger'} />);
    } else if (alias.length === 0) {
      setMessage(<DivAlert message={'Erro: Preencha o campo destinado ao apelido.'} alert={'alert-danger'} />);
    } else if (phones.length === 0) {
      setMessage(<DivAlert message={'Erro: Você deve adicionar ao menos um telefone.'} alert={'alert-danger'} />);
    } else if (emails.length === 0) {
      setMessage(<DivAlert message={'Erro: Você deve adicionar ao menos um e-mail.'} alert={'alert-danger'} />);
    } else if (contact === null) {
      setSubmitDisabled(true);
      try {
        const response = await contactService.create(authorization, { name, alias, phone: phones, email: emails });
        dispatch(actions.contactsActions.addContact(response.data));
        setMessage(<DivAlert message={`Contato ${name} salvo.`} alert={'alert-success'} />);
        setName('');
        setAlias('');
        setPhones([]);
        setPhone('');
        setEmails([]);
        setEmail('');
      } catch (error) {
        if (error.response.data.status === 401) {
          storageAuth.removeAuth();
          storageAuth.setAuthError(error.response.data.message);
          history.push('/login');
        } else {
          setMessage(<DivAlert message={error.response ? `Erro: ${error.response.data.message}.` : 'Erro: Não foi possível salvar o contato.'} alert={'alert-danger'} />);
        }
      } finally {
        setSubmitDisabled(false);
      }
    } else {
      setSubmitDisabled(true);
      try {
        await contactService.update(authorization, { id: contact.id, name, alias, phone: phones, email: emails });
        dispatch(actions.contactActions.setContact(null));
        try {
          const response = await contactService.read(authorization);
          dispatch(actions.contactsActions.setContacts(response.data));
          setMessage(<DivAlert message={'Contato atualizado.'} alert={'alert-success'} />);
        } catch (error) {
          setMessage(<DivAlert message={`Contato ${name} atualizado com sucesso, porém não foi possível atualizar a lista de contatos.\n${error.response ? `Erro: ${error.response.data.message}.` : ''}`} alert={'alert-success'} />);
        } finally {
          setSubmitDisabled(false);
        }
      } catch (error) {
        if (error.response.data.status === 401) {
          storageAuth.removeAuth();
          storageAuth.setAuthError(error.response.data.message);
          history.push('/login');
        } else {
          setMessage(<DivAlert message={error.response ? `Erro: ${error.response.data.message}.` : 'Erro: Não foi possível atualizar o contato.'} alert={'alert-danger'} />);
        }
      } finally {
        setSubmitDisabled(false);
      }
    }
  }

  return (
    <>
      <div className="form-group">
        <h4 className="d-flex mb-3 text-muted">Novo Contato</h4>
        <form className="card" onSubmit={handleSubmit}>
          <div className="card-body">
            <label className="form-group has-float-label mb-4">
              <input type="text" className="form-control" id="name" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Nome" required />
              <span>Nome</span>
            </label>
            <label className="form-group has-float-label mb-4">
              <input type="text" className="form-control" id="alias" name="alias" value={alias} onChange={e => setAlias(e.target.value)} placeholder="Apelido" required />
              <span>Apelido</span>
            </label>
            {phoneList()}
            <div className="form-group input-group mb-4">
              <label className="has-float-label">
                <input
                  type="text" className="form-control" id="phone" name="phone" value={phone}
                  onChange={e => setPhone(e.target.value)} placeholder="Telefone"
                  onKeyPress={e => { if (e.key === 'Enter') addPhone(e) }}
                  formNoValidate
                />
                <span>Telefone</span>
              </label>
              <div className="input-group-append">
                <button className="btn btn-outline-primary" onClick={addPhone} formNoValidate>
                  <span className="fa fa-plus" />
                </button>
              </div>
            </div>
            {emailList()}
            <div className="form-group input-group mb-4">
              <label className="has-float-label">
                <input
                  type="email" className="form-control" id="email" name="email" value={email}
                  onChange={e => setEmail(e.target.value)} placeholder="E-mail"
                  onKeyPress={e => { if (e.key === 'Enter') addEmail(e) }}
                  formNoValidate
                />
                <span>E-mail</span>
              </label>
              <div className="input-group-append">
                <button className="btn btn-outline-primary" onClick={addEmail} formNoValidate>
                  <span className="fa fa-plus" />
                </button>
              </div>
            </div>
            {message}
            <div className="d-flex justify-content-between mb-1">
              {buttonClearOrCancel()}
              <input type="submit" className="btn btn-primary btn-fix" value="Salvar" disabled={submitDisabled} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormContact;
