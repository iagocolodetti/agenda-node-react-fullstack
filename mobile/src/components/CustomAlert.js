import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function CustomAlert(props) {
  const { children, alert } = props;

  function getBackgroundColor(alert) {
    switch (alert) {
      case 'primary':
        return '#cce5ff';
      case 'secondary':
        return '#e2e3e5';
      case 'success':
        return '#d4edda';
      case 'danger':
        return '#f8d7da';
      case 'warning':
        return '#fff3cd';
      case 'info':
        return '#d1ecf1';
      case 'light':
        return '#fefefe';
      case 'dark':
        return '#d6d8d9';
      default:
        return '#fff';
    }
  }

  function getBorderColor(alert) {
    switch (alert) {
      case 'primary':
        return '#b5d6fb';
      case 'secondary':
        return '#d6d8db';
      case 'success':
        return '#c3e6cb';
      case 'danger':
        return '#f5c6cb';
      case 'warning':
        return '#ffeeba';
      case 'info':
        return '#bee5eb';
      case 'light':
        return '#fdfdfe';
      case 'dark':
        return '#c6c8ca';
      default:
        return '#fff';
    }
  }

  function getTextColor(alert) {
    switch (alert) {
      case 'primary':
        return '#195493';
      case 'secondary':
        return '#383d41';
      case 'success':
        return '#155724';
      case 'danger':
        return '#721c24';
      case 'warning':
        return '#856404';
      case 'info':
        return '#0c5460';
      case 'light':
        return '#818182';
      case 'dark':
        return '#1b1e21';
      default:
        return '#000';
    }
  }

  const styles = StyleSheet.create({
    view: {
      backgroundColor: getBackgroundColor(alert),
      justifyContent: 'center',
      alignSelf: 'stretch',
      alignItems: 'center',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: getBorderColor(alert),
      borderRadius: 3
    },
    text: {
      padding: 4,
      fontSize: 16,
      color: getTextColor(alert)
    }
  });

  return (
    <View style={styles.view}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

export default CustomAlert;
