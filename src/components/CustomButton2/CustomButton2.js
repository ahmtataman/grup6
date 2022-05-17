import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const CustomButton2 = ({onPress, text}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    top: 50,
    padding: 15,
    backgroundColor: '#67b2d9',
    width: '55%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Anek',
    color: 'white',
    // shadowColor: 'black',
    // textShadowOffset: { width: 0, height: 1 },
    // textShadowRadius: 10,
    // shadowOffset: 1,
  },
});
export default CustomButton2;
