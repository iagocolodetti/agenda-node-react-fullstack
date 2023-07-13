import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import FloatingLabelInput from '../components/FloatingLabelInput';
import FloatingLabelInputWithButton from '../components/FloatingLabelInputWithButton';
import MyButton from '../components/MyButton';
import Logout from '../components/Logout';
import CustomAlert from '../components/CustomAlert';

import contactService from '../services/contactService';

import storageAuth from '../utils/storageAuth';

function UpdateContact({ navigation }) {
  const [name, setName] = useState(' ');
  const [alias, setAlias] = useState(' ');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phones, setPhones] = useState([]);
  const [emails, setEmails] = useState([]);
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setMessage(null);
    try {
      const { contact } = navigation.state.params;
      setName(contact.name ? contact.name : '');
      setAlias(contact.alias ? contact.alias : '');
      setPhones(contact.phone ? contact.phone : []);
      setEmails(contact.email ? contact.email : []);
    } catch {
      navigation.navigate('Contacts');
    }
  }, []);

  function customAlert(message, alert) {
    return (
      <View style={{ paddingTop: 24 }}>
        <CustomAlert alert={alert}>{message}</CustomAlert>
      </View>
    );
  }

  function addPhone() {
    if (phone.length > 0) {
      setPhones([...phones, {
        'phone': phone
      }]);
      setPhone('');
    }
  }

  function deletePhone(idx) {
    if (phones[idx].id === undefined) {
      setPhones(phones.filter((_, i) => i !== idx));
    } else {
      setPhones([...phones.filter((_, i) => i !== idx), { ...phones[idx], deleted: true }]);
    }
  }

  function PhoneList() {
    if (phones.length > 0) {
      return (
        <View>
          <Text style={styles.textInfo}>Telefone(s)</Text>
          <View style={styles.viewList}>
            {phones.map((p, i) => p.deleted === undefined || p.deleted === false ? (
              <View style={i === phones.length - 1 ? styles.listItemNoBorder : styles.listItem} key={i}>
                <Text style={styles.textItem}>{p.phone}</Text>
                <TouchableOpacity hitSlop={{ top: 1, bottom: 30 }} onPress={() => deletePhone(i)}>
                  <View style={styles.buttonItem}>
                    <Icon name="trash-alt" size={16} color="#f00" />
                  </View>
                </TouchableOpacity>
              </View>
            ) : null)}
          </View>
        </View>
      );
    } else return null;
  }

  function addEmail() {
    if (email.length > 0) {
      setEmails([...emails, {
        'email': email
      }]);
      setEmail('');
    }
  }

  function deleteEmail(idx) {
    if (emails[idx].id === undefined) {
      setEmails(emails.filter((_, i) => i !== idx));
    } else {
      setEmails([...emails.filter((_, i) => i !== idx), { ...emails[idx], deleted: true }]);
    }
  }

  function EmailList() {
    if (emails.length > 0) {
      return (
        <View>
          <Text style={styles.textInfo}>E-mail(s)</Text>
          <View style={styles.viewList}>
            {emails.map((e, i) => e.deleted === undefined || e.deleted === false ? (
              <View style={i === emails.length - 1 ? styles.listItemNoBorder : styles.listItem} key={i}>
                <Text style={styles.textItem}>{e.email}</Text>
                <TouchableOpacity hitSlop={{ top: 1, bottom: 36 }} onPress={() => deleteEmail(i)}>
                  <View style={styles.buttonItem}>
                    <Icon name="trash-alt" size={16} color="#f00" />
                  </View>
                </TouchableOpacity>
              </View>
            ) : null)}
          </View>
        </View>
      );
    } else return null;
  }

  async function update() {
    try {
      const authorization = await storageAuth.getAuth();
      if (name.length === 0) {
        setMessage(customAlert('Erro: Preencha o campo destinado ao nome.', 'danger'));
      } else if (alias.length === 0) {
        setMessage(customAlert('Erro: Preencha o campo destinado ao apelido.', 'danger'));
      } else if (phones.filter(p => (p.deleted === undefined || p.deleted === false)).length === 0) {
        setMessage(customAlert('Erro: Você deve adicionar ao menos um telefone.', 'danger'));
      } else if (emails.filter(e => (e.deleted === undefined || e.deleted === false)).length === 0) {
        setMessage(customAlert('Erro: Você deve adicionar ao menos um e-mail.', 'danger'));
      } else {
        setUpdateDisabled(true);
        try {
          const { id } = navigation.state.params.contact;
          await contactService.update(authorization, { id, name, alias, phone: phones, email: emails });
          navigation.navigate('Contacts');
        } catch (error) {
          if (error.response.data.status === 401) {
            await storageAuth.removeAuth();
            await storageAuth.setAuthError(error.response.data.message);
            navigation.navigate('Login');
          } else {
            setMessage(customAlert(error.response ? `Erro: ${error.response.data.message}.` : 'Erro: Não foi possível atualizar o contato.', 'danger'));
          }
        } finally {
          setUpdateDisabled(false);
        }
      }
    } catch (error) {
      setMessage(customAlert(`Erro: ${error}`, 'danger'));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logout navigation={navigation} />
      <ScrollView contentContainerStyle={styles.contactContainer}>
        <View style={styles.viewTextInput}>
          <FloatingLabelInput
            label="Nome"
            autoCapitalize="none"
            autoCompleteType="name"
            autoCorrect={false}
            keyboardType="default"
            value={name}
            onChangeText={e => setName(e)}
          />
        </View>
        <View style={styles.viewTextInput}>
          <FloatingLabelInput
            label="Apelido"
            autoCapitalize="none"
            autoCompleteType="name"
            autoCorrect={false}
            keyboardType="default"
            value={alias}
            onChangeText={e => setAlias(e)}
          />
        </View>
        <PhoneList />
        <View style={styles.viewTextInput}>
          <FloatingLabelInputWithButton
            label="Telefone"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            keyboardType="phone-pad"
            inputValue={phone}
            onChangeText={e => setPhone(e)}
            btnIcon="plus"
            btnColor="primary"
            onPress={addPhone}
            hitSlop={{ top: 4 }}
          />
        </View>
        <EmailList />
        <View style={styles.viewTextInput}>
          <FloatingLabelInputWithButton
            label="E-mail"
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            keyboardType="email-address"
            inputValue={email}
            onChangeText={e => setEmail(e)}
            btnIcon="plus"
            btnColor="primary"
            onPress={addEmail}
            hitSlop={{ top: 4 }}
          />
        </View>
        {message}
        <View style={styles.viewButton}>
          <MyButton color="primary" onPress={update} disabled={updateDisabled}>Atualizar</MyButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 4,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 6
  },
  contactContainer: {
    marginTop: 2
  },
  viewTextInput: {
    paddingTop: 18,
    alignSelf: 'stretch'
  },
  textInfo: {
    marginTop: 18,
    marginBottom: 2,
    fontSize: 18,
    color: '#444'
  },
  viewList: {
    paddingTop: 2,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 3
  },
  listItem: {
    paddingTop: 6,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: '#cdcdcd',
    paddingBottom: 6
  },
  listItemNoBorder: {
    paddingTop: 6,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  textItem: {
    fontSize: 16,
    color: '#222',
    paddingTop: 2
  },
  buttonItem: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#f00',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewButton: {
    marginTop: 22,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default UpdateContact;
