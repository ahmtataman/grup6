import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, text}) => {
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
    backgroundColor: '#47A6D7',
    width: '55%',
    borderRadius: 25,
    alignItems: 'center',
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
export default CustomButton;
