import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

function MyButton(props) {
  const {
    children,
    color,
    size,
    height,
    width,
    fontSize,
    disabled
  } = props;

  function getTextColor() {
    const opacity = disabled ? '99' : 'ff';
    switch (color) {
      case 'warning':
      case 'light':
        return '#000000' + opacity;
      default:
        return '#ffffff' + opacity;
    }
  }

  function getBackgroundColor() {
    const opacity = disabled ? '99' : 'ff';
    switch (color) {
      case 'primary':
        return '#007bff' + opacity;
      case 'secondary':
        return '#6c757d' + opacity;
      case 'success':
        return '#28a745' + opacity;
      case 'danger':
        return '#dc3545' + opacity;
      case 'warning':
        return '#ffc107' + opacity;
      case 'info':
        return '#17a2b8' + opacity;
      case 'light':
        return '#f8f9fa' + opacity;
      case 'dark':
        return '#343a40' + opacity;
      default:
        return '#3a3a3a' + opacity;
    }
  }

  function getHeight() {
    if (!height) {
      switch (size) {
        case 'small':
          return 25;
        case 'normal':
          return 35;
        case 'normal':
          return 45;
        default:
          return 35;
      }
    } else return height;
  }

  function getWidth() {
    if (!width) {
      switch (size) {
        case 'small':
          return 75;
        case 'normal':
          return 160;
        case 'big':
          return 245;
        default:
          return 160;
      }
    } else return width;
  }

  function getFontSize() {
    if (!fontSize) {
      switch (size) {
        case 'small':
          return 14;
        case 'normal':
          return 16;
        case 'big':
          return 18;
        default:
          return 16;
      }
    } else return fontSize;
  }

  const styles = StyleSheet.create({
    view: {
      flexDirection: 'row',
      height: getHeight(),
      width: getWidth(),
      backgroundColor: getBackgroundColor(),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4
    },
    text: {
      color: getTextColor(),
      fontSize: getFontSize(),
      textAlign: 'center'
    },
  });

  return (
    <TouchableOpacity {...props} disabled={disabled}>
      <View style={styles.view}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default MyButton;
