import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProfilePlaceHolder from '../../../assets/images/profile_empty.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import TextButton from '../../components/TextButton';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Profile = ({navigation}) => {
  // console.log(ProfilePlaceHolder)
  const ImageUri = Image.resolveAssetSource(ProfilePlaceHolder).uri;
  const [image, setImage] = useState(ImageUri);
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const {height} = useWindowDimensions();

  var user = auth().currentUser;
  var name, email, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    emailVerified = user.emailVerified;
    uid = user.uid;
  } else {
    console.log('no user');
  }
  useEffect(() => {
    const urlGetFunc = async () => {
      const urlDownload = await storage()
        .ref(uid)
        .getDownloadURL();
      console.log(urlDownload);
      setImage(urlDownload);
    };

    urlGetFunc();
  }, []);

  // console.log(name);
  // setImage(uid);
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      // console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  };
  const uploadImage = async () => {
    // }
    // console.log(user);
    const URL = image;
    let filename = 'test';
    // console.log(URL);
    try {
      await storage()
        .ref(filename)
        .putFile(URL);
      Alert.alert('Fotoğraf Yüklendi!');
    } catch (e) {
      console.log('error upload');
    }
  };

  // console.log(ImageUri)
  return (
    <View style={{backgroundColor: '#F1F9FF'}}>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <ImageBackground
            source={{
              uri: image,
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
          <TouchableOpacity onPress={choosePhotoFromLibrary}>
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
                  uri: image,
                }}
                style={{
                  height: 100,
                  width: 100,
                  position: 'absolute',
                  top: 190,
                  right: 130,
                  elevation: 10,
                  borderRadius: 50,
                }}
                imageStyle={{borderRadius: 1000}}
              />

              {/* <CustomButton text="GİRİS YAP" onPress={'urlGetFunc'} /> */}
            </View>
          </TouchableOpacity>

          <Text style={styles.text2}>PROFIL</Text>
          <View style={styles.back}>
            <Text style={styles.profiletext2}>Ad</Text>
            <View
              style={{
                top: 10,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                opacity: 0.3,
              }}
            />
            <Text style={styles.profiletext}>{name}</Text>
            <Text style={styles.profiletext2}>E-posta Adresi</Text>
            <View
              style={{
                top: 10,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                opacity: 0.3,
                // width: '90%',
              }}
            />
            <Text style={styles.profiletext}>{email}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => navigation.navigate('main')}
          style={styles.exit}
        >
          <Text style={styles.textexit}>ANA MENÜ</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  exit: {
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 6,
    backgroundColor: '#0000',
    shadowRadius: 15,
    shadowOffset: {width: 56, height: 13},
    borderWidth: 0,
    borderRadius: 0,
    left: 125,

    top: 300,

    padding: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: '#47A6D7',
    width: '30%',
    borderRadius: 25,
  },
  textexit: {
    left: 10,
    fontSize: 15,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  text3: {
    top: 210,
    right: 130,
    fontFamily: 'Anek',
    fontSize: 15,
    color: '#67b2d9',
  },
  back: {
    // position: '',
    top: 220,
    backgroundColor: 'white',
    width: '90%',
    borderColor: '#e8e8e8',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    elevation: 0.5,
    paddingBottom: 20,
  },
  profiletext: {
    // position: 'absolute',
    // alignItems: 'center',
    top: 10,
    // right: 30,
    fontFamily: 'Anek',
    fontSize: 25,
    paddingTop: 10,
    paddingBottom: 10,
    // color: '#67b2d9',
  },
  profiletext2: {
    // position: 'absolute',
    // alignItems: 'center',
    top: 10,
    // right: 30,
    fontFamily: 'Anek',
    fontSize: 15,
    color: '#67b2d9',
  },
  container: {
    // backgroundColor: '#F1F9FF',
  },
  container2: {
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
  logo: {
    // padding: 10,
    maxWidth: 400,
    maxHeight: 400,
    resizeMode: 'contain',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    // image: Image,
    // padding: 13,
    // borderRadius: 10,
    // backgroundColor: '#FF6347',
    // alignItems: 'center',
    // marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  text: {
    top: -10,

    // padding: 10,
    fontFamily: 'computer_7',
    fontSize: 40,
    // left: 45,
  },
  text2: {
    top: 210,
    right: 130,
    fontFamily: 'Anek',
    fontSize: 25,
    color: '#67b2d9',
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
export default Profile;
