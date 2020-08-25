import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

import FloatingLabelInput from '../components/FloatingLabelInput';
import MyButton from '../components/MyButton';

function NewUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

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
      <MyButton style={{ paddingTop: 26 }} color="primary" width={140} onPress={null}>Criar conta</MyButton>
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
