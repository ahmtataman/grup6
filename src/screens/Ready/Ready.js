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

const Ready = ({navigation}) => {
  const {height} = useWindowDimensions();
  //   const signOut = () => {
  //     auth()
  //       .signOut()
  //       .then(() => console.log('User signed out!'))
  //       .then(() => navigation.navigate('signin'))
  //       .catch(error => this.setState({errorMessage: error.message}));
  //   };
  return (
    <View style={styles.view}>
      <Text style={styles.texttitle}>SIBER KAHRAMAN</Text>
      <Image source={Logo} style={[styles.logo, {height: height * 0.32}]} />
      <View style={styles.containertext}>
        <Text style={styles.maintext}>
          Merhaba ben Siber Kahraman! Siber Riskler ve Tehditler ile kahramanca
          mücadele ediyorum. Eğer sen de tehditler ile savaşmak istiyorsan,
          hazırladığım konularda yeterli bilgiye sahip olduğunu kanıtla ve sen
          de bir Siber Kahraman ol!
        </Text>
      </View>
      <Image
        source={Logo2}
        style={[
          styles.logo2,
          {height: height * 0.25},
          {position: 'absolute', top: 600, left: 200, opacity: 0.5},
          {},
        ]}
      />
      <Pressable
        onPress={() => navigation.navigate('main')}
        style={styles.exit}
      >
        <Text style={styles.textexit}>HAZIRIM!</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  containertext: {
    // top: 50,
    padding: 15,
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 25,
    alignItems: 'center',
  },
  maintext: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
  },
  texttitle: {
    // top: -10,

    // padding: 10,
    fontFamily: 'computer_7',
    fontSize: 40,
    // left: 45,
  },
  logo: {
    // top: 10,
    maxWidth: 300,
    maxHeight: 300,
    resizeMode: 'contain',
  },
  logo2: {
    top: 10,
    maxWidth: 300,
    maxHeight: 300,
    resizeMode: 'contain',
  },
  view: {
    // flexDirection: 'column',
    top: 20,
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

export default Ready;
