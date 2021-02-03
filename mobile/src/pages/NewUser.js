import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

import FloatingLabelInput from '../components/FloatingLabelInput';
import MyButton from '../components/MyButton';
import CustomAlert from '../components/CustomAlert';

import userService from '../services/userService';

function NewUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [createDisabled, setCreateDisabled] = useState(false);
  const [message, setMessage] = useState(null);

  function customAlert(message, alert) {
    return (
      <View style={{ paddingTop: 24 }}>
        <CustomAlert alert={alert}>{message}</CustomAlert>
      </View>
    );
  }

  async function create() {
    setMessage(null);
    if (!username) {
      setMessage(customAlert('Erro: Preencha o campo destinado ao nome.', 'danger'));
    } else if (!password) {
      setMessage(customAlert('Erro: Preencha o campo destinado à senha.', 'danger'));
    } else if (!passwordConfirm) {
      setMessage(customAlert('Erro: Confirme a senha.', 'danger'));
    } else if (password !== passwordConfirm) {
      setMessage(customAlert('Erro: Senhas diferentes.', 'danger'));
    } else {
      setCreateDisabled(true);
      try {
        await userService.create(username, password);
        setMessage(customAlert(`Usuário '${username}' cadastrado com sucesso.`, 'success'));
        setUsername('');
        setPassword('');
        setPasswordConfirm('');
      } catch (error) {
        setMessage(customAlert(error.response ? `Erro: ${error.response.data.message}.` : 'Erro: Não foi possível cadastrar o usuário.', 'danger'));
      } finally {
        setCreateDisabled(false);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textMuted}>Novo Usuário</Text>
      <View style={{ paddingTop: 18, alignSelf: 'stretch' }}>
        <FloatingLabelInput
          label="Nome"
          autoCapitalize='none'
          autoCorrect={false}
          value={username}
          onChangeText={e => setUsername(e)}
        />
      </View>
      <View style={{ paddingTop: 18, alignSelf: 'stretch' }}>
        <FloatingLabelInput
          label="Senha"
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={e => setPassword(e)}
        />
      </View>
      <View style={{ paddingTop: 18, alignSelf: 'stretch' }}>
        <FloatingLabelInput
          label="Confirme a Senha"
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
          value={passwordConfirm}
          onChangeText={e => setPasswordConfirm(e)}
        />
      </View>
      {message}
      <MyButton style={{ paddingTop: 26 }} color="primary" width={140} onPress={create} disabled={createDisabled}>Criar conta</MyButton>
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
  }
});

export default NewUser;
