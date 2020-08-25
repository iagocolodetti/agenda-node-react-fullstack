import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Logout from '../components/Logout';
import CustomAlert from '../components/CustomAlert';

import contactService from '../services/contactService';

import storageAuth from '../utils/storageAuth';

function Contact({ navigation }) {
  const [contact, setContact] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    try {
      setContact(navigation.state.params.contact);
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

  function handleUpdate() {
    navigation.navigate('UpdateContact', { contact });
  }

  async function handleDelete() {
    Alert.alert(
      'Deletar Contato',
      'Você realmente deseja deletar esse contato?',
      [
        {
          text: 'Não',
          onPress: null
        },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              const authorization = await storageAuth.getAuth();
              try {
                await contactService.destroy(authorization, contact.id);
                navigation.navigate('Contacts');
              } catch (error) {
                if (error.response.data.status === 401) {
                  await storageAuth.removeAuth();
                  await storageAuth.setAuthError(error.response.data.message);
                  navigation.navigate('Login');
                } else {
                  alert(error.response ? `Erro: ${error.response.data.message}.` : 'Erro: Não foi possível deletar o contato.');
                }
              }
            } catch (error) {
              setMessage(customAlert(`Erro: ${error}`, 'danger'));
            }
          }
        }
      ],
      {
        cancelable: true
      }
    );
  }

  function PhoneList() {
    const { phone: phones } = contact;
    if (contact.phone.length > 0) {
      return (
        <View>
          <Text style={styles.textInfo}>Telefone(s)</Text>
          <View style={styles.viewList}>
            {phones.map((p, i) => (
              <View style={i === phones.length - 1 ? styles.listItemNoBorder : styles.listItem} key={p.id}>
                <Text style={styles.textItem}>{p.phone}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    } else return null;
  }

  function EmailList() {
    const { email: emails } = contact;
    if (emails.length > 0) {
      return (
        <View>
          <Text style={styles.textInfo}>E-mail(s)</Text>
          <View style={styles.viewList}>
            {emails.map((e, i) => (
              <View style={i === emails.length - 1 ? styles.listItemNoBorder : styles.listItem} key={e.id}>
                <Text style={styles.textItem}>{e.email}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    } else return null;
  }

  function ShowContact() {
    if (contact) {
      return (
        <ScrollView contentContainerStyle={styles.contactContainer}>
          <View style={styles.viewNameAndButtons}>
            <Text style={styles.textName}>{contact.name}</Text>
            <View style={styles.viewButtons}>
              <TouchableOpacity style={{ ...styles.button, borderColor: '#777', marginRight: 12 }} onPress={handleUpdate}>
                <Icon name="edit" size={24} color="#777" />
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.button, borderColor: '#f00' }} onPress={handleDelete}>
                <Icon name="trash-alt" size={24} color="#f00" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.textAlias}>{contact.alias}</Text>
          <PhoneList />
          <EmailList />
        </ScrollView>
      );
    } else return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logout navigation={navigation} />
      {message}
      <ShowContact />
    </SafeAreaView >
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
    paddingTop: 16,
    paddingBottom: 8,
  },
  viewNameAndButtons: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  textName: {
    fontSize: 22,
    color: '#444'
  },
  viewButtons: {
    flexDirection: 'row'
  },
  button: {
    borderWidth: 1,
    borderRadius: 3,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textAlias: {
    fontSize: 18,
    color: '#444',
    fontStyle: 'italic'
  },
  viewTextInput: {
    paddingTop: 18,
    alignSelf: 'stretch'
  },
  textInfo: {
    marginTop: 17,
    marginBottom: 2,
    fontSize: 17,
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
  }
});

export default Contact;
