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
  TouchableOpacity,
} from 'react-native';
// import ProfilePlaceHolder from '../../../assets/images/profile_empty.png';
import auth from '@react-native-firebase/auth';
import CustomButton from '../../components/CustomButton/CustomButton';
import ProfilePlaceHolder from '../../../assets/images/profile_empty.png';
import ImagePicker from 'react-native-image-crop-picker';
import Call from './Call.js';

export default class Signup extends Component {
  constructor() {
    super();
    this.State = {image2: null};
    this.State = {imageProfile: null};

    this.state = {
      displayName: '',
      email: '',
      password: '',
      isLoading: false,
    };
  }
  // choosePhotoFromLibrary = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7,
  //   }).then(imageProfile => {
  //     console.log(imageProfile);
  //     setImage(imageProfile.path);
  //     this.bs.current.snapTo(1);
  //   });
  // };
  // componentDidMount() {
  //   this.setState({image2: Image.resolveAssetSource(ProfilePlaceHolder).uri});
  //   this.setState({
  //     imageProfile: Image.resolveAssetSource(ProfilePlaceHolder).uri,
  //   });
  // }
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
          this.props.navigation.navigate('signin');
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
        <Call />
        <Text style={styles.title}>KAYIT </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="İsmin"
          value={this.state.displayName}
          onChangeText={val => this.updateInputVal(val, 'displayName')}
        />
        <TextInput
          style={[styles.inputStyle]}
          placeholder="E-Posta Adresin"
          value={this.state.email}
          onChangeText={val => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Şifren"
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
          onPress={() => this.registerUser()}
          style={styles.container2}
        >
          <Text style={styles.text}>KAYIT OL</Text>
        </Pressable>

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
  title: {
    textAlign: 'center',
    fontFamily: 'Anek',
    fontSize: 25,
    color: '#47A6D7',
    padding: 10,
  },
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
    backgroundColor: '#F1F9FF',
  },
  inputStyle: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    // borderBottomWidth: 1,
  },
  loginText: {
    color: '#3740FE',
    top: 80,
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
