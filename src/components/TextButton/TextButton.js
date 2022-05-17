import { Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, text, text2, text3 }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.text2}>{text2}</Text>
      <Text style={styles.text3}>{text3}</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  container: {
    top: 85,
    // left: 130,
    padding: 15,
    // backgroundColor: ,
    width: '55%',
    borderRadius: 25,
    alignItems: 'center',
  },
  text: {
    top: -17,
    left: 60,
    fontSize: 15,
    fontFamily: 'Anek',
    color: '#67b2d9',
    // shadowColor: 'black',
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 5,
    // shadowOffset: 1,
  },
  text2: {
    top: -130,
    left: -30,
    fontSize: 15,
    fontFamily: 'Anek',
    color: 'black',
    // shadowColor: 'black',
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 5,
    // shadowOffset: 1,
  },
  text3: {
    top: -200,
    // top: -50,
    // left: 45,
    fontSize: 15,
    fontFamily: 'Anek',
    color: '#67b2d9',
    // shadowColor: 'black',
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 5,
    // shadowOffset: 1,
  },
})
export default CustomButton
