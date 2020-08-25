import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, SafeAreaView, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Logout from '../components/Logout';
import CustomAlert from '../components/CustomAlert';

import contactService from '../services/contactService';

import storageAuth from '../utils/storageAuth';

function Contacts({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState(null);

  const readCallback = useCallback(async () => {
    setRefreshing(true);
    setContacts([]);
    setMessage(null);
    try {
      const authorization = await storageAuth.getAuth();
      if (authorization) {
        try {
          const response = await contactService.read(authorization);
          if (Array.isArray(response.data) && response.data.length > 0) {
            setContacts(response.data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
          } else {
            setMensagem(customAlert('Não há contatos cadastrados', 'danger'));
          }
        } catch (error) {
          if (error.response.data.status === 401) {
            await storageAuth.removeAuth();
            await storageAuth.setAuthError(error.response.data.message);
            navigation.navigate('Login');
          } else {
            setMessage(customAlert((error.response ? `Erro: ${error.response.data.message}.` : 'Erro: Não foi possível buscar os contatos.') + ' Tente recarregar a página.', 'danger'));
          }
        }
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      setMessage(customAlert(`Erro: ${error}`, 'danger'));
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    readCallback();
  }, []);

  useEffect(() => {
    const navFocusListener = navigation.addListener('willFocus', () => {
      readCallback();
    });
    return () => {
      navFocusListener.remove();
    };
  }, []);

  function customAlert(message, alert) {
    return (
      <View style={{ paddingTop: 24 }}>
        <CustomAlert alert={alert}>{message}</CustomAlert>
      </View>
    );
  }

  function contactInfo(contact) {
    navigation.navigate('Contact', { contact });
  }

  function newContact() {
    navigation.navigate('NewContact');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logout navigation={navigation} />
      {message}
      <FlatList
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={readCallback} />
        }
        data={contacts}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={() => contactInfo(item)}>
            <Text style={styles.textName}>{item.name}</Text>
            <Text style={styles.textAlias}>{item.alias}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity style={styles.btnPlus} onPress={newContact}>
        <Icon name="plus" size={34} color="#fff" />
      </TouchableOpacity>
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
  listContainer: {
    paddingBottom: 8
  },
  listItem: {
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderRadius: 4,
    borderWidth: 3,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 4
  },
  textName: {
    fontSize: 20,
    color: '#444'
  },
  textAlias: {
    fontSize: 14,
    color: '#444',
    fontStyle: 'italic'
  },
  btnPlus: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 52,
    height: 52,
    backgroundColor: '#0c0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26
  }
});

export default Contacts;
