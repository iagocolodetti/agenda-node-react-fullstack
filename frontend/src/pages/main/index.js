import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../actions';

import './styles.css';

import Logout from '../../components/Logout';
import ContactCard from '../../components/ContactCard';
import FormContact from '../../components/FormContact';
import DivAlert from '../../components/DivAlert';

import contactService from '../../services/contactService';

import storageAuth from '../../utils/storageAuth';

function Main() {
  const history = useHistory();
  const authorization = storageAuth.getAuth();
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      if (authorization) {
        try {
          const response = await contactService.read(authorization);
          if (response.data.length > 0) {
            dispatch(actions.contactsActions.setContacts(response.data));
          }
        } catch (error) {
          if (error.response.data.status === 401) {
            storageAuth.removeAuth();
            storageAuth.setAuthError(error.response.data.message);
            history.push('/login');
          } else {
            setMessage(<DivAlert message={(error.response ? `Erro: ${error.response.data.message}.` : 'Erro: Não foi possível buscar os contatos.') + ' Tente recarregar a página.'} alert={'alert-danger'} />);
          }
        }
      } else {
        history.push('/login');
      }
    }
    fetchData();
  }, [authorization, dispatch, history]);

  return (
    <>
      <nav className="navbar navbar-expand py-0">
        <ul className="navbar-nav ml-auto">
          <Logout />
        </ul>
      </nav>
      <div className="row">
        <div className="col-sm-4 order-md-2">
          <div className="sticky-top">
            <FormContact />
          </div>
        </div>
        <div className="col-sm-8 order-md-1">
          <h4 className="mb-3 text-muted">Contatos</h4>
          {message}
          <div className="row">
            {contacts.map(c => (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 mb-4" key={c.id}>
                <ContactCard contact={c} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
