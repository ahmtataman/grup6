import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import Logo from '../../../assets/images/hack1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import TextButton from '../../components/TextButton';

SignInScreen = ({navigation}) => {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const {height} = useWindowDimensions();

  const üyeol = () => {
    console.warn('üyelik');
  };
  const unuttum = () => {
    console.warn('şifre unuttum');
  };
  function authmeth() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) {
      return null;
    }

    if (!user) {
      return (
        <View>
          <Text>Login</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>Welcome {user.email}</Text>
      </View>
    );
  }

  createUser = (email, password) => {
    try {
      auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <View style={styles.root}>
      <Text style={styles.text}>SIBER KAHRAMAN</Text>
      <Image source={Logo} style={[styles.logo, {height: height * 0.33}]} />
      <Text style={styles.text2}>GIRIS YAP</Text>
      <CustomInput placeholder="E-posta" value={mail} setValue={setMail} />
      <CustomInput
        placeholder="Şifreniz"
        value={pass}
        setValue={setPass}
        secureTextEntry={true}
      />

      <CustomButton
        text="GİRİS YAP"
        onPress={() => navigation.navigate('main')}
      />
      <TextButton text="ÜYE OL" onPress={üyeol} />
      <TextButton text2="Hesabın Yok Mu?  I" onPress={'this.createUser'} />
      <TextButton text3="Şifremi Unuttum!" onPress={unuttum} />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    top: -10,

    // padding: 10,
    fontFamily: 'computer_7',
    fontSize: 40,
    // left: 45,
  },
  text2: {
    top: 20,
    fontFamily: 'Anek',
    fontSize: 25,
    color: '#47A6D7',
  },
  logo: {
    // padding: 10,
    maxWidth: 400,
    maxHeight: 400,
    resizeMode: 'contain',
  },
  input: {},
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,

    // top: 70,
    // position: 'absolute',
  },
});
export default SignInScreen;
