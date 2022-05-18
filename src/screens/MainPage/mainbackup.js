import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Logo from '../../../assets/images/hack1.png';
import Logo2 from '../../../assets/images/binary-code.png';
import auth from '@react-native-firebase/auth';

const MainPage = ({navigation}) => {
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch(error => this.setState({errorMessage: error.message}));
  };
  const {height} = useWindowDimensions();
  return (
    <View style={styles.view}>
      <Text style={styles.texttitle}>SIBER KAHRAMAN</Text>
      <Image source={Logo} style={[styles.logo, {height: height * 0.25}]} />
      <Pressable
        onPress={() => navigation.navigate('start')}
        style={styles.container}
      >
        <Text style={styles.text}>BAŞLA</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('main')}
        style={styles.container}
      >
        <Text style={styles.text1}>BAŞARIMLARIM</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('main')}
        style={styles.container}
      >
        <Text style={styles.text2}>LİDER TAHTASI</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('profile')}
        style={styles.container}
      >
        <Text style={styles.text3}>PROFİL</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('main')}
        style={styles.container}
      >
        <Text style={styles.text4}>ANALİZLERİM</Text>
      </Pressable>
      <Image
        source={Logo2}
        style={[
          styles.logo,
          {height: height * 0.25},
          {position: 'absolute', top: 600, left: 200, opacity: 0.5},
          {},
        ]}
      />
      <Pressable
        onPress={() => navigation.navigate('signin')}
        style={styles.exit}
      >
        <Text style={styles.textexit}>ÇIKIŞ YAP</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  texttitle: {
    // top: -10,

    // padding: 10,
    fontFamily: 'computer_7',
    fontSize: 40,
    // left: 45,
  },
  logo: {
    top: 10,
    maxWidth: 300,
    maxHeight: 300,
    resizeMode: 'contain',
  },
  view: {
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textexit: {
    left: 15,
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

    top: 30,

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
    top: 20,

    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#47A6D7',
    width: '55%',
    borderRadius: 25,
    // justifyContent: 'center',
  },
  text: {
    left: 67,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text1: {
    left: 30,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text2: {
    left: 32,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text3: {
    left: 65,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text4: {
    left: 35,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default MainPage;
