import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import actions from '../../actions';

import contactService from '../../services/contactService';

import storageAuth from '../../utils/storageAuth';

function ContactCard(props) {
  const { contact } = props;

  const history = useHistory();

  const authorization = storageAuth.getAuth();

  const dispatch = useDispatch();

  const [isPhoneCollapsed, setPhoneCollapsed] = useState(true);
  const [isEmailCollapsed, setEmailCollapsed] = useState(true);

  function handleEdit() {
    dispatch(actions.contactActions.setContact(contact));
  }

  async function handleDelete() {
    if (window.confirm('Você realmente deseja deletar esse contato?')) {
      try {
        await contactService.destroy(authorization, contact.id);
        dispatch(actions.contactsActions.destroyContact(contact.id));
      } catch (error) {
        if (error.response.data.status === 401) {
          storageAuth.removeAuth();
          storageAuth.setAuthError(error.response.data.message);
          history.push('/login');
        } else {
          alert(error.response ? `Erro: ${error.response.data.message}.` : 'Erro: Não foi possível deletar o contato.');
        }
      }
    }
  }

  function phoneList() {
    const { phone } = contact;

    let list = [];

    phone.forEach((p, i) => {
      if (i === 0) {
        list = <li className="list-group-item" key={p.id}>{p.phone}</li>;
      } else if (!isPhoneCollapsed) {
        list = [
          list,
          <li className="list-group-item" key={p.id}>{p.phone}</li>
        ];
      }
    });

    if (phone.length > 1) {
      const icon = isPhoneCollapsed ? "fa fa-angle-double-down" : "fa fa-angle-double-up";
      list = [
        list,
        <li className="list-group-item" key={-1}>
          <button className="btn btn-link btn-sm btn-block" type="button" onClick={phoneListCollapse}>
            <span className={icon} />
          </button>
        </li>
      ];
    }

    return list;
  }

  function phoneListCollapse() {
    setPhoneCollapsed(!isPhoneCollapsed);
  }

  function emailList() {
    const { email } = contact;

    let list = [];

    email.forEach((e, i) => {
      if (i === 0) {
        list = <li className="list-group-item" key={e.id}>{e.email}</li>;
      } else if (!isEmailCollapsed) {
        list = [
          list,
          <li className="list-group-item" key={e.id}>{e.email}</li>
        ];
      }
    });

    if (email.length > 1) {
      const icon = isEmailCollapsed ? "fa fa-angle-double-down" : "fa fa-angle-double-up";
      list = [
        list,
        <li className="list-group-item" key={-1}>
          <button className="btn btn-link btn-sm btn-block" type="button" onClick={emailListCollapse}>
            <span className={icon} />
          </button>
        </li>
      ];
    }

    return list;
  }

  function emailListCollapse() {
    setEmailCollapsed(!isEmailCollapsed);
  }

  return (
    <>
      <div className="card" key={contact.id}>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-2">
            <h5 className="card-title">{contact.name}</h5>
            <div>
              <button className="btn btn-outline-secondary btn-sm mr-3" onClick={handleEdit}>
                <span className="fa fa-edit" />
              </button>
              <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
                <span className="fa fa-trash" />
              </button>
            </div>
          </div>
          <h6 className="card-subtitle mb-4 text-muted">{contact.alias}</h6>
          <h6 className="card-subtitle mb-1 text-muted">Telefone(s)</h6>
          <ul className="list-group text-center">
            {phoneList()}
          </ul>
          <h6 className="card-subtitle mt-3 mb-1 text-muted">E-mail(s)</h6>
          <ul className="list-group text-center">
            {emailList()}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ContactCard;
