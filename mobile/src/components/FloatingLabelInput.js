import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

function FloatingLabelInput(props) {
  const {
    label,
    value
  } = props;
  
  const [isFloating, setFloating] = useState(value === '' ? false : true);
  
  useEffect(() => {
    setFloating(value === '' ? false : true);
  }, [value]);

  const styles = StyleSheet.create({
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
    }
  });

  return (
    <View>
      <Text style={styles.text}>
        {label}
      </Text>
      <TextInput
        style={styles.textInput}
        {...props}
      />
    </View>
  );
}

export default FloatingLabelInput;
