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
import CustomButton from '../../components/CustomButton/CustomButton';
import TextButton from '../../components/TextButton';
import React, {Component} from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }

  //mail/pass value değişiklikleri için state
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  //Firebase auth ile kullanıcı girişi
  userLogin = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Giriş yapmak için bilgileri giriniz!');
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
          this.props.navigation.navigate('ready');
        })
        .catch(error => this.setState({errorMessage: error.message}));
    }
  };

  //Giriş yapılırken renderlanan indicator
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
        <Text style={styles.text2}>GİRİŞ YAP</Text>
        <View style={styles.container}>
          <TextInput
            style={[styles.inputStyle, {borderBottomWidth: 0.2}]}
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

        <CustomButton text="GİRİS YAP" onPress={() => this.userLogin()} />
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
  inputStyle: {
    padding: 10,
    paddingBottom: 10,
  },
  container: {
    top: 20,
    backgroundColor: 'white',
    width: '90%',
    borderColor: '#e8e8e8',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    elevation: 0.5,
  },
  text: {
    top: -10,
    fontFamily: 'computer_7',
    fontSize: 40,
  },
  text2: {
    top: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    fontSize: 25,
    color: '#47A6D7',
  },
  logo: {
    maxWidth: 400,
    maxHeight: 400,
    resizeMode: 'contain',
  },
  input: {},
  root: {
    backgroundColor: '#F1F9FF',
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
});
