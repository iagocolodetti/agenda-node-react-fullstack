import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

function FloatingLabelInputWithButton(props) {
  const {
    label,
    autoCapitalize,
    autoCompleteType,
    autoCorrect,
    keyboardType,
    inputValue,
    onChangeText,
    btnIcon,
    btnColor,
    onPress,
    hitSlop
  } = props;
  
  const [isFloating, setFloating] = useState(inputValue === '' ? false : true);

  useEffect(() => {
    setFloating(inputValue === '' ? false : true);
  }, [inputValue]);

  function getIconColor() {
    switch (btnColor) {
      case 'primary':
        return '#007bff';
      case 'secondary':
        return '#6c757d';
      case 'success':
        return '#28a745';
      case 'danger':
        return '#dc3545';
      case 'warning':
        return '#ffc107';
      case 'info':
        return '#17a2b8';
      case 'light':
        return '#f8f9fa';
      case 'dark':
        return '#343a40';
      default:
        return '#3a3a3a';
    }
  }

  function getBorderColor() {
    switch (btnColor) {
      case 'primary':
        return '#007bff';
      case 'secondary':
        return '#6c757d';
      case 'success':
        return '#28a745';
      case 'danger':
        return '#dc3545';
      case 'warning':
        return '#ffc107';
      case 'info':
        return '#17a2b8';
      case 'light':
        return '#f8f9fa';
      case 'dark':
        return '#343a40';
      default:
        return '#3a3a3a';
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row'
    },
    viewInput: {
      flex: 1
    },
    text: {
      position: 'absolute',
      left: isFloating ? 8 : 7,
      top: isFloating ? -9 : 5,
      fontSize: isFloating ? 12 : 18,
      color: isFloating ? '#2fb5c4' : '#000',
      opacity: isFloating ? .8 : .6
    },
    textInput: {
      height: 36,
      fontSize: 18,
      color: '#000',
      borderBottomWidth: 1,
      borderColor: '#aaa',
      paddingHorizontal: 7,
      paddingVertical: 5
    },
    viewBtn: {
      height: 36,
      width: 36,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderColor: getBorderColor()
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.viewInput}>
        <Text style={styles.text}>
          {label}
        </Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize={autoCapitalize}
          autoCompleteType={autoCompleteType}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          value={inputValue}
          onChangeText={onChangeText}
          onSubmitEditing={onPress}
        />
      </View>
      <TouchableOpacity hitSlop={hitSlop} onPress={onPress}>
        <View style={styles.viewBtn}>
          <Icon name={btnIcon} size={18} color={getIconColor()} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default FloatingLabelInputWithButton;
