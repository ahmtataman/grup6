import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

import CustomButton2 from '../../components/CustomButton2/CustomButton2';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ProfilePlaceHolder from '../../../assets/images/profile_empty.png';
import React, {useState, useEffect} from 'react';

const Start = ({navigation}) => {
  const ImageUri = Image.resolveAssetSource(ProfilePlaceHolder).uri;
  const [image, setImage] = useState(ImageUri);
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
  // console.log(uid);

  useEffect(() => {
    const urlGetFunc = async () => {
      const urlDownload = await storage()
        .ref(uid)
        .getDownloadURL();
      // console.log(urlDownload);

      setImage(urlDownload);
    };

    urlGetFunc();
  }, []);
  return (
    <View style={styles.view}>
      <View
        style={{
          top: 30,
          backgroundColor: 'white',
          width: '70%',
          height: '9%',
          borderColor: '#e8e8e8',
          borderWidth: 0.5,
          borderRadius: 60,
          paddingHorizontal: 10,
          marginVertical: 5,
          elevation: 10,
          position: 'absolute',
          left: -50,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <ImageBackground
            source={{
              uri: image,
            }}
            style={{
              height: 80,
              width: 80,
              position: 'absolute',
              elevation: 15,
              borderRadius: 30,
              right: 120,
              top: -5,
              borderColor: 'black',
              // borderWidth: 1,
              // backgroundColor: 'black',
            }}
            imageStyle={{borderRadius: 1000}}
          />

          <Text
            style={{
              // elevation: 10,
              // borderRadius: 50,
              // backgroundColor: 'white',
              fontFamily: 'Exo2-VariableFont_wght',
              position: 'absolute',
              fontSize: 20,
              right: 20,
              top: 5,
              paddingHorizontal: 10,
            }}
          >
            Merhaba
          </Text>
          <Text
            style={{
              paddingHorizontal: 10,
              // elevation: 1,
              // borderRadius: 10,
              // backgroundColor: 'white',
              fontFamily: 'Exo2-VariableFont_wght',
              position: 'absolute',
              color: 'black',
              fontSize: 30,
              right: 10,
              top: 25,
            }}
          >
            {name}
          </Text>
        </TouchableOpacity>
      </View>
      <Pressable
        onPress={() => navigation.navigate('main')}
        style={styles.container}
      >
        <Text style={styles.text}>SOSYAL MEDYA</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('main')}
        style={styles.container}
      >
        <Text style={styles.text1}>ONLINE OYUNLAR</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('hint')}
        style={styles.container}
      >
        <Text style={styles.text2}>İPUÇLARI</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('main')}
        style={styles.exit}
      >
        <Text style={styles.textexit}>ANA MENÜ</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    // flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#F1F9FF',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  textexit: {
    left: 10,
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

    top: 300,

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
    top: 190,

    padding: 15,
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: '#47A6D7',
    width: '55%',
    borderRadius: 25,
    // justifyContent: 'center',
  },
  text: {
    left: 25,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text1: {
    left: 18,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text2: {
    left: 50,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Start;
