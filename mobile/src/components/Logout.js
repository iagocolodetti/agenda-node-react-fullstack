import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import storageAuth from '../utils/storageAuth';

function Logout({ navigation }) {

  async function logout() {
    try {
      await storageAuth.clear();
    } catch (error) {
      console.log(`Erro: ${error}`);
    } finally {
      navigation.navigate('Login');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textLink} onPress={logout}>Logout</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    paddingTop: 3,
  },
  textLink: {
    fontSize: 16,
    color: '#1155ff',
    textDecorationLine: 'underline',
  }
});

export default Logout;
