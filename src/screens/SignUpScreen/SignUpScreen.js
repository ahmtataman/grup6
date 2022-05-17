import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
// import ProfilePlaceHolder from '../../../assets/images/profile_empty.png';
import auth from '@react-native-firebase/auth';
import CustomButton from '../../components/CustomButton/CustomButton';
import ProfilePlaceHolder from '../../../assets/images/profile_empty.png';
import Ahmet from './Ahmet';
export default class Signup extends Component {
  constructor() {
    super();
    this.State = {image2: null};

    this.state = {
      displayName: '',
      email: '',
      password: '',
      isLoading: false,
    };
  }
  componentDidMount() {
    this.setState({image2: Image.resolveAssetSource(ProfilePlaceHolder).uri});
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  registerUser = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Kayıt olmak için bilgileri giriniz!');
    } else {
      this.setState({
        isLoading: true,
      });

      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          res.user.updateProfile({
            displayName: this.state.displayName,
          });
          console.log('Kayıt Başarılı!');
          this.setState({
            isLoading: false,
            displayName: '',
            email: '',
            password: '',
          });
          this.props.navigation.navigate('main');
        })
        .catch(error => this.setState({errorMessage: error.message}));
    }
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: this.state.image2,
          }}
          style={{
            height: 400,
            width: 400,
            top: -100,
            right: 100,
            opacity: 0.3,
            position: 'absolute',
            // borderWidth: 0.5,
            // borderRadius: 500,
          }}
          imageStyle={{borderRadius: 1000}}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={val => this.updateInputVal(val, 'displayName')}
        />
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
        {/* <CustomButton
          style={styles.button}
          text="KAYIT OL"
          onPress={() => this.registerUser()}
        /> */}
        {/* <Button
          style={{flex: 1}}
          title="Signup"
          onPress={() => this.registerUser()}
        /> */}
        <Pressable
          onPress={() => this.props.navigation.navigate('Login')}
          style={styles.container2}
        >
          <Text style={styles.text}>KAYIT OL</Text>
        </Pressable>
        <Ahmet kutay={this.state.password} />
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('signin')}
        >
          Zaten Hesabın Var mı? Giriş Yap
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container2: {
    top: 50,
    padding: 15,
    left: 70,
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
  button: {
    top: 100,
    padding: 15,
    backgroundColor: '#47A6D7',
    width: 10,
    height: 5,
    borderRadius: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  loginText: {
    color: '#3740FE',
    top: 60,
    // marginTop: 50,
    textAlign: 'center',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
