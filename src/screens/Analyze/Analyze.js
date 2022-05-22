import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ProfilePlaceHolder from '../../../assets/images/profile_empty.png';
import React, {useState, useEffect} from 'react';
import Star from '../../../assets/images/star.png';
import Bar from '../../../assets/images/bar2.png';
import Test from '../../../assets/images/test.png';
import firestore from '@react-native-firebase/firestore';

const Analyze = ({navigation}) => {
  const placeHolderUrl = Image.resolveAssetSource(ProfilePlaceHolder).uri;
  const [profileImage, setProfileImage] = useState(placeHolderUrl);
  const [starCountLatest, setStarCountLatest] = useState();
  const [testCountLatest, setTestCountLatest] = useState();

  var user = auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }

  //Toplamda kaç test bitirdiğinin veri tabanından çekilmesi için
  useEffect(() => {
    const getTestCount = async () => {
      firestore()
        .collection('person')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          console.log('TestCount:', documentSnapshot.data().testCount);

          setTestCountLatest(documentSnapshot.data().testCount);
        });
    };

    getTestCount();
  }, []);

  //Toplamda kaç yıldız topladığını veritabanından çekmek için
  useEffect(() => {
    const getStarCount = async () => {
      firestore()
        .collection('person')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          console.log('Star Count:', documentSnapshot.data().starCount);
          setStarCountLatest(documentSnapshot.data().starCount);
          console.log(starCountLatest);
        });
    };

    getStarCount();
  }, []);

  //Toplamda kaç ipucu okuduğu
  useEffect(() => {
    const getHintViewCount = async () => {
      firestore()
        .collection('person')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          console.log('HintViewCount', documentSnapshot.data().hintViewCount);
        });
    };

    getHintViewCount();
  }, []);

  //Profil Fotoğrafı dbden
  useEffect(() => {
    const urlGetFunc = async () => {
      const urlDownload = await storage()
        .ref(uid)
        .getDownloadURL();
      // console.log(urlDownload);

      setProfileImage(urlDownload);
    };

    urlGetFunc();
  }, []);

  return (
    <View style={styles.root}>
      <View
        style={{
          top: 30,
          backgroundColor: '#47A6D7',
          width: '70%',
          height: 69,
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
              uri: profileImage,
            }}
            style={{
              height: 80,
              width: 80,
              position: 'absolute',
              elevation: 15,
              borderRadius: 40,
              right: 120,
              top: -5,
              borderColor: 'black',
              borderWidth: 1,
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
      <View style={styles.view}>
        <Pressable onPress={null} style={styles.container}>
          <Text style={styles.text}>ANALİZLERİM</Text>
        </Pressable>
        <Image
          source={Bar}
          style={{height: 130, width: 320, position: 'relative'}}
        />
        <Text style={[styles.exp, {top: 100}]}> Bu Hafta </Text>
        <Text
          style={[
            styles.exp,
            {
              top: 130,
              paddingBottom: 5,
              borderColor: '#47A6D7',
              borderBottomColor: '#47A6D7',
              borderBottomWidth: 0.6,
            },
          ]}
        >
          Çalışma süren
        </Text>

        <Text style={[styles.exp, {top: 160}, {fontSize: 50}]}>
          {/* placeholder */}
          00:00:00{' '}
        </Text>
      </View>

      <View style={styles.back}>
        <View style={styles.badge}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={Star} style={{height: 80, width: 80}} />
            <Text style={styles.count}>{starCountLatest}/60</Text>
          </View>
        </View>
        <View style={styles.back2}>
          <View style={styles.badge}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image source={Test} style={{height: 70, width: 50}} />
              <Text style={styles.count2}>{testCountLatest}/20</Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => {
            navigation.navigate('main');
          }}
          style={styles.exit}
        >
          <Text style={styles.textexit}>ANA MENÜ</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  exp: {
    position: 'absolute',

    fontSize: 25,
    fontFamily: 'Exo2-VariableFont_wght',
    color: '#47A6D7',
  },
  count: {
    textAlign: 'center',
    margin: 10,
    fontSize: 60,
    fontFamily: 'Exo2-VariableFont_wght',
    color: '#47A6D7',
  },
  count2: {
    bottom: 10,
    textAlign: 'center',
    left: 10,
    margin: 10,
    fontSize: 60,
    fontFamily: 'Exo2-VariableFont_wght',
    color: '#47A6D7',
  },
  badgetitle: {
    paddingTop: 10,
    fontSize: 18,
    fontFamily: 'Exo2-VariableFont_wght',
    color: '#47A6D7',
  },

  container: {
    elevation: 6,
    borderWidth: 0,
    borderRadius: 0,
    bottom: 20,
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#47A6D7',
    width: '50%',
    borderRadius: 30,
  },
  badge: {
    paddingVertical: 10,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  back: {
    top: -40,
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '80%',
    height: '15%',
    borderColor: '#e8e8e8',
    borderWidth: 0.5,
    borderRadius: 40,
    elevation: 6,
    alignItems: 'center',
  },
  back2: {
    marginTop: 15,
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 0.5,
    borderRadius: 40,
    elevation: 6,
    alignItems: 'center',
  },
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#F1F9FF',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  view: {
    bottom: 70,
    width: '120%',
    alignItems: 'center',
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
    top: 20,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: '#47A6D7',
    width: '35%',
    borderRadius: 25,
  },
  container2: {
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 6,

    borderWidth: 0,
    borderRadius: 0,
    bottom: 140,
    padding: 5,

    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#47A6D7',
    width: '50%',
    borderRadius: 30,
  },
  text: {
    textAlign: 'center',
    padding: 5,
    fontSize: 25,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
});
export default Analyze;
