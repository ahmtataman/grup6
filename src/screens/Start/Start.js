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
          backgroundColor: '#47A6D7',
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
            }}
            imageStyle={{borderRadius: 1000}}
          />

          <Text
            style={{
              fontFamily: 'Exo2-VariableFont_wght',
              position: 'absolute',
              fontSize: 20,
              right: 20,
              top: 3,
              paddingHorizontal: 10,
              color: '#EFF9FF',
              opacity: 0.7,
            }}
          >
            Merhaba
          </Text>
          <Text
            style={{
              paddingHorizontal: 10,
              fontFamily: 'Exo2-VariableFont_wght',
              position: 'absolute',
              color: 'black',
              fontSize: 30,
              right: 11,
              top: 23,
              color: 'white',
            }}
          >
            {name}
          </Text>
        </TouchableOpacity>
      </View>
      <Pressable
        onPress={() => navigation.navigate('map1')}
        style={styles.container}
      >
        <Text style={styles.text}>SOSYAL MEDYA</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('map2')}
        style={styles.container}
      >
        <Text style={styles.text}>ONLINE OYUNLAR</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('hint')}
        style={styles.container}
      >
        <Text style={styles.text}>İPUÇLARI</Text>
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
    alignItems: 'center',
    backgroundColor: '#F1F9FF',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  textexit: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  exit: {
    elevation: 6,
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
    elevation: 6,
    borderWidth: 0,
    borderRadius: 0,
    top: 190,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 20,
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
});

export default Start;
