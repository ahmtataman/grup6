import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  Pressable,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ProfilePlaceHolder from '../../../assets/images/profile_empty.png';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image2: null,
      userAuthId: '',
      displayName: '',
      email: '',
      password: '',
      isLoading: false,

      user: {
        name: '',
        mail: '',
        AuthId: '', //auth user.uid ile birlikte db girişi yapılması için
        starCount: '', //Testlerden toplamda kaç yıldız topladığı, yıldız sayısına göre lider tahtası
        averageTestTime: '', //Testler esnasında geçirdiği süre
        testCount: '', //Kaç test bitirdiği
        hintViewCount: '', //Kaç ipucu okuduğu
        dailySignInCount: '', //Günde kaç kere giriş yaptığı
      },
    };
  }

  //verilerin aynı anda firestore db'e yüklemek ve gerektiğinde çekmek için
  addUser = async () => {
    firestore()
      .collection('person')
      .doc(this.state.userAuthId)
      .set({
        name: this.state.displayName,
        mail: this.state.email,
        AuthID: this.state.userAuthId,
        starCount: 0,
        averageTestTime: 0,
        testCount: 0,
        hintViewCount: 0,
        dailySignInCount: 0,
      });
    // console.log(res.user.uid);
  };

  //imagePicker ile galeriden profil fotoğrafı çekmek için
  choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(imageProfile => {
      console.log(imageProfile.path);
      this.setState({image2: imageProfile.path});
      console.log(this.state.image2);
    });
  };

  componentDidMount() {
    this.setState({image2: Image.resolveAssetSource(ProfilePlaceHolder).uri});
    this.setState({
      imageProfile: Image.resolveAssetSource(ProfilePlaceHolder).uri,
    });
  }

  //mail, password değişkenlerini güncelleyerek tutması için
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  //firebase Auth email/password ile kullanıcı kaydı
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

          this.setState({userAuthId: res.user.uid});

          console.log('res', res);

          console.log('Kayıt Başarılı!');

          this.props.navigation.navigate('signin');
        })
        .then(() => this.addUser())
        .then(() => this.uploadImage())

        .catch(error => this.setState({errorMessage: error.message}));
    }
  };

  //Profil fotoğrafı firebase cloud storage yüklemesi. User.uid ile.
  uploadImage = async test => {
    console.log(test);

    try {
      await storage()
        .ref(this.state.userAuthId)
        .putFile(this.state.image2);
      Alert.alert('Fotoğraf Yüklendi!');
    } catch (e) {
      console.log(e);
    }
  };

  //Veritabanı erişimi esnasında gösterdiği loading ekranı
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
            top: -130,
            right: 50,
            opacity: 0.3,
            position: 'absolute',
          }}
          imageStyle={{borderRadius: 1000}}
        />
        <TouchableOpacity onPress={() => this.choosePhotoFromLibrary()}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ImageBackground
              source={{
                uri: this.state.image2,
              }}
              style={{
                height: 100,
                width: 100,
                position: 'absolute',
                top: -40,
                left: 108,
                elevation: 10,
                borderRadius: 100,
              }}
              imageStyle={{borderRadius: 1000}}
            />
          </View>
        </TouchableOpacity>

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
    paddingLeft: 15,
  },
  loginText: {
    color: '#3740FE',
    top: 80,
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
