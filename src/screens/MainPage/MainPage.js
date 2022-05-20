import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import Logo from '../../../assets/images/hack1.png';
import King from '../../../assets/images/king.png';
import Logo2 from '../../../assets/images/binary-code.png';
import auth from '@react-native-firebase/auth';

const MainPage = ({navigation}) => {
  const {height} = useWindowDimensions();

  //Kullanıcının çıkış yapması için func
  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .then(() => navigation.navigate('signin'))
      .catch(error => this.setState({errorMessage: error.message}));
  };

  //currentUser verilerini çekmek için
  var user = auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }
  console.log(name);

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
        onPress={() => navigation.navigate('achive')}
        style={styles.container}
      >
        <Text style={styles.text}>BAŞARIMLARIM</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('lider')}
        style={styles.container}
      >
        <Image
          source={King}
          style={{
            bottom: 20,
            left: -24,
            height: 50,
            width: 50,
            transform: [{rotate: '-40deg'}],
            position: 'absolute',
          }}
        />
        <Text style={styles.text}>LİDER TAHTASI</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('profile')}
        style={styles.container}
      >
        <Text style={styles.text}>PROFİL</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('analiz')}
        style={styles.container}
      >
        <Text style={styles.text}>ANALİZLERİM</Text>
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
      <Pressable onPress={() => signOut()} style={styles.exit}>
        <Text style={styles.textexit}>ÇIKIŞ YAP</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  texttitle: {
    fontFamily: 'computer_7',
    fontSize: 40,
  },
  logo: {
    top: 10,
    maxWidth: 300,
    maxHeight: 300,
    resizeMode: 'contain',
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textexit: {
    textAlign: 'center',
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
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  text1: {
    left: 30,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  text2: {
    left: 32,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  text3: {
    left: 65,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  text4: {
    left: 35,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
});

export default MainPage;
