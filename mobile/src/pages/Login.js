import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FloatingLabelInput from '../components/FloatingLabelInput';
import MyButton from '../components/MyButton';
import CustomAlert from '../components/CustomAlert';

import sessionService from '../services/sessionService';

import storageAuth from '../utils/storageAuth';

function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [message, setMessage] = useState(null);

  const loginCallback = useCallback(async () => {
    try {
      if (await storageAuth.getAuth()) {
        navigation.navigate('Contacts');
      } else {
        const error = await storageAuth.getAuthError();
        if (error) {
          setMessage(customAlert(`Erro: ${error}.`, 'danger'));
          await storageAuth.removeAuthError();
        }
      }
    } catch (error) {
      setMessage(customAlert('Erro: Não foi possível consultar o armazenamento local.', 'danger'));
    }
  }, []);

  useEffect(() => {
    const navFocusListener = navigation.addListener('willFocus', () => {
      loginCallback();
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

  async function login() {
    setMessage(null);
    if (!username) {
      setMessage(customAlert('Erro: Preencha o campo destinado ao nome.', 'danger'));
    } else if (!password) {
      setMessage(customAlert('Erro: Preencha o campo destinado à senha.', 'danger'));
    } else {
      setSubmitDisabled(true);
      try {
        const response = await sessionService.create(username, password);
        const { authorization } = response.headers;
        await storageAuth.setAuth(authorization);
        navigation.navigate('Contacts');
      } catch (error) {
        setMessage(customAlert(error.response ? `Erro: ${error.response.data.message}.` : 'Erro: Não foi possível fazer login.', 'danger'));
      } finally {
        setSubmitDisabled(false);
      }
    }
  }

  function newUser() {
    navigation.navigate('NewUser');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textMuted}>Login</Text>
      <View style={styles.viewTextInput}>
        <FloatingLabelInput
          label="Nome"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          value={username}
          onChangeText={e => setUsername(e)}
        />
      </View>
      <View style={styles.viewTextInput}>
        <FloatingLabelInput
          label="Senha"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          secureTextEntry={true}
          value={password}
          onChangeText={e => setPassword(e)}
        />
      </View>
      {message}
      <View style={styles.viewBtn}>
        <Text style={styles.textLink} onPress={newUser}>Criar conta</Text>
        <MyButton color="primary" width={120} onPress={login} disabled={submitDisabled}>Login</MyButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '25%',
    paddingLeft: 16,
    paddingRight: 16
  },
  textMuted: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666'
  },
  viewTextInput: {
    paddingTop: 18,
    alignSelf: 'stretch'
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingTop: 22,
  },
  textLink: {
    paddingTop: 3,
    fontSize: 16,
    color: '#1155ff',
    textDecorationLine: 'underline',
  }
});

export default Login;
