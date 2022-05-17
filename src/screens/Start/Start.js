import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import CustomButton2 from '../../components/CustomButton2/CustomButton2';

const Start = ({navigation}) => {
  return (
    <View style={styles.view}>
      <Pressable
        onPress={() => navigation.navigate('main')}
        style={styles.container}
      >
        <Text style={styles.text}>SOSYAL MEDYA</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('main')}
        style={styles.container}
      >
        <Text style={styles.text1}>ONLINE OYUNLAR</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('hint')}
        style={styles.container}
      >
        <Text style={styles.text2}>İPUÇLARI</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('main')}
        style={styles.exit}
      >
        <Text style={styles.textexit}>ANA MENÜ</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textexit: {
    left: 10,
    fontSize: 15,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  exit: {
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 6,
    backgroundColor: '#0000',
    shadowRadius: 15,
    shadowOffset: {width: 56, height: 13},
    borderWidth: 0,
    borderRadius: 0,

    top: 300,

    padding: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: '#47A6D7',
    width: '30%',
    borderRadius: 25,
  },
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 6,
    backgroundColor: '#0000',
    shadowRadius: 15,
    shadowOffset: {width: 56, height: 13},
    borderWidth: 0,
    borderRadius: 0,
    top: 190,

    padding: 15,
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: '#47A6D7',
    width: '55%',
    borderRadius: 25,
    // justifyContent: 'center',
  },
  text: {
    left: 25,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text1: {
    left: 18,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text2: {
    left: 50,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Start;
