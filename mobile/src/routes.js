import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './pages/Login';
import NewUser from './pages/NewUser';
import Contacts from './pages/Contacts';
import Contact from './pages/Contact';
import NewContact from './pages/NewContact';
import UpdateContact from './pages/UpdateContact';

const Routes = createAppContainer(
  createStackNavigator({
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Login'
      }
    },
    NewUser: {
      screen: NewUser,
      navigationOptions: {
        title: 'Novo Usuário'
      }
    },
    Contacts: {
      screen: Contacts,
      navigationOptions: {
        title: 'Contatos'
      }
    },
    Contact: {
      screen: Contact,
      navigationOptions: {
        title: 'Contato'
      }
    },
    NewContact: {
      screen: NewContact,
      navigationOptions: {
        title: 'Novo Contato'
      }
    },
    UpdateContact: {
      screen: UpdateContact,
      navigationOptions: {
        title: 'Atualizar Contato'
      }
    }
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#3c3c3c'
      }
    }
  })
);

export default Routes;
