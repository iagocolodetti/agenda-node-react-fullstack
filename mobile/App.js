import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import Routes from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3c3c3c" />
      <Routes />
    </>
  );
}
