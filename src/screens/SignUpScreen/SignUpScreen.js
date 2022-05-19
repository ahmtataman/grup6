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
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../../components/CustomButton/CustomButton';
import ProfilePlaceHolder from '../../../assets/images/profile_empty.png';
import ImagePicker from 'react-native-image-crop-picker';
import Call from './Call.js';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    // this.State = {image2: null};
    // this.State = {imageProfile: null};
    // this.State = {URL: null};
    // this.State = {filename: null};
    // this.getUser();
    // state = {
    // this.App();
    // };

    // this.subscriber = firestore()
    //   .collection('person')
    //   .doc('Elv2gXlGcDu9PpY7vEE4')
    //   .onSnapshot(doc => {
    //     this.setState({
    //       user: {
    //         name: doc.data().name,
    //         mail: doc.data().mail,
    //       },
    //     });
    //   });
    // firestore()
    //   .collection('person')
    //   .get()
    //   .then(querySnapshot => {
    //     console.log('Total users: ', querySnapshot.size);

    //     querySnapshot.forEach(documentSnapshot => {
    //       console.log(
    //         'User ID: ',
    //         documentSnapshot.id,
    //         documentSnapshot.data(),
    //       );
    //     });
    //   });

    this.state = {
      userAuthId: '',
      displayName: '',
      email: '',
      password: '',
      isLoading: false,
      data: 'ahmet',
      user: {
        name: '',
        mail: '',
        AuthId: '',
      },
    };
  }
  // App() {
  //   // Set an initializing state whilst Firebase connects
  //   const [initializing, setInitializing] = useState(true);
  //   const [user, setUser] = useState();

  //   // Handle user state changes
  //   function onAuthStateChanged(user) {
  //     setUser(user);
  //     if (initializing) {
  //       setInitializing(false);
  //     }
  //   }

  //   useEffect(() => {
  //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //     return subscriber; // unsubscribe on unmount
  //   }, []);
  //   if (!user) {
  //     return (
  //       <View>
  //         <Text>Login</Text>
  //       </View>
  //     );
  //   }
  //   if (initializing) {
  //     return null;
  //   }
  //   return (
  //     <View>
  //       <Text>Welcome {user.email}</Text>
  //     </View>
  //   );
  // }
  addUser = async () => {
    firestore()
      .collection('person')
      .doc(this.state.userAuthId)
      .set({
        name: this.state.displayName,
        mail: this.state.email,
        AuthID: this.state.userAuthId,
        // yas: ,
      });
    // console.log(res.user.uid);
  };
  // getUser = async () => {
  //   const userDocument = await firestore()
  //     .collection('person')
  //     .doc('Elv2gXlGcDu9PpY7vEE4')
  //     .get();
  //   console.log(userDocument);
  // };
  // usersCollection = () => {
  //   const data = firestore().collection('person');
  //   console.log(data);
  // };
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
            // userAuthId: this.state.res.user.uid,
          });

          // console.log(userAuthId);
          // (this.userAuthId = this.state.res.user.id),
          // console.log(res.user.uid);
          this.setState({userAuthId: res.user.uid});
          // console.log(userAuthId);
          // console.log(res);
          console.log('res', res);
          console.log('Kayıt Başarılı!');

          // this.setState({
          //   isLoading: false,
          //   displayName: '',
          //   email: '',
          //   password: '',
          // });
          this.props.navigation.navigate('signin');
        })
        .then(() => this.addUser())

        .catch(error => this.setState({errorMessage: error.message}));
    }
  };
  // getdata = () => {
  //   const data = firestore()
  //     .collection('person')
  //     // .where('name', '==', this.state.data)
  //     .get();
  //   // this.setState({data: data});
  //   console.log(data);
  // };

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
