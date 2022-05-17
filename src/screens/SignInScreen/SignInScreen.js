import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  useWindowDimensions,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import Logo from '../../../assets/images/hack1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import TextButton from '../../components/TextButton';
import React, {Component} from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      displayname: '',
      email: '',
      password: '',
      isLoading: false,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  userLogin = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!');
    } else {
      this.setState({
        isLoading: true,
      });

      auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          console.log(res);
          console.log('User logged-in successfully!');
          this.setState({
            isLoading: false,
            email: '',
            password: '',
          });
          this.props.navigation.navigate('main');
        })
        .catch(error => this.setState({errorMessage: error.message}));
    }
  };

  render() {
    // const {height} = useWindowDimensions();
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.root}>
        <Text style={styles.text}>SIBER KAHRAMAN</Text>
        <Image source={Logo} style={[styles.logo, {height: 250}]} />
        <Text style={styles.text2}>GIRIS YAP</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            value={this.state.email}
            onChangeText={val => this.updateInputVal(val, 'email')}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            value={this.state.password}
            onChangeText={val => this.updateInputVal(val, 'password')}
            maxLength={15}
            secureTextEntry={true}
          />
        </View>

        <CustomButton
          text="GİRİS YAP"
          onPress={() => this.props.navigation.navigate('main')}
        />
        <TextButton
          text="ÜYE OL"
          onPress={() => this.props.navigation.navigate('signup')}
        />
        <TextButton text2="Hesabın Yok Mu?  I" onPress={'this.createUser'} />
        <TextButton text3="Şifremi Unuttum!" onPress={'unuttum'} />
      </View>
    );
  }
}
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