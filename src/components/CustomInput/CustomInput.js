import {View, StyleSheet, TextInput} from 'react-native';
import React from 'react';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
  //   console.log(value)
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        placeholder={placeholder}
        // underlineColorAndroid="grey"
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />

      {/* <TextInput placeholder="Şifre" style={styles.input}/> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    top: 20,
    backgroundColor: 'white',
    width: '90%',
    borderColor: '#e8e8e8',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    //    padding: 10,
  },
});
export default CustomInput;
