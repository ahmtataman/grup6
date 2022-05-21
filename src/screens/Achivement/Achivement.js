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
import Trophy from '../../../assets/images/trophy.png';
import Badge from '../../../assets/images/badge.png';
import BadgeBlack from '../../../assets/images/BadgeBlack.png';
import firestore from '@react-native-firebase/firestore';

const Achivement = ({navigation}) => {
  const placeHolderUrl = Image.resolveAssetSource(ProfilePlaceHolder).uri;
  const [profileImage, setProfileImage] = useState(placeHolderUrl);

  const stateBadge = Image.resolveAssetSource(BadgeBlack).uri;
  const [SignCount, setSignCount] = useState();
  const [badgeSign, setBadgeSign] = useState(stateBadge);
  const [badgeTime, setBadgeTime] = useState(stateBadge);
  const [badgeTestCount, setBadgeTestCount] = useState(stateBadge);
  const [badgeMaster, setBadgeMaster] = useState(stateBadge);
  const [badgeHint, setBadgeHint] = useState(stateBadge);
  const [badgeEnd, setBadgeEnd] = useState(stateBadge);

  var user = auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }
  //Toplamda kaç kez uygulamaya giriş yaptığının veri tabanından çekilmesi için
  useEffect(() => {
    const getSignInCount = async () => {
      firestore()
        .collection('person')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          console.log(
            'Daily Sign In:',
            documentSnapshot.data().dailySignInCount,
          );
          if (documentSnapshot.data().dailySignInCount > 10) {
            setBadgeTestCount(Image.resolveAssetSource(Badge).uri);
          }
        });
    };

    getSignInCount();
  }, []);

  //Toplamda kaç test bitirdiğinin veri tabanından çekilmesi için
  useEffect(() => {
    const getTestCount = async () => {
      firestore()
        .collection('person')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          console.log('TestCount:', documentSnapshot.data().testCount);
          if (documentSnapshot.data().testCount > 5) {
            setBadgeSign(Image.resolveAssetSource(Badge).uri);
          }
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
          if (documentSnapshot.data().starCount > 10) {
            setBadgeMaster(Image.resolveAssetSource(Badge).uri);
          }
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
          console.log('Star Count:', documentSnapshot.data().hintViewCount);
          if (documentSnapshot.data().hintViewCount > 10) {
            setBadgeHint(Image.resolveAssetSource(Badge).uri);
          }
        });
    };

    getHintViewCount();
  }, []);

  //Testlerde ortalama ne kadar süre harcadığı
  useEffect(() => {
    const getAverageTime = async () => {
      firestore()
        .collection('person')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          console.log('Star Count:', documentSnapshot.data().averageTestTime);
          if (documentSnapshot.data().averageTestTime < 10) {
            setBadgeTime(Image.resolveAssetSource(Badge).uri);
          }
        });
    };

    getAverageTime();
  }, []);
  //Tüm yıldızları toplayıp toplamadığı
  useEffect(() => {
    const getFullStar = async () => {
      firestore()
        .collection('person')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          console.log('Star Count:', documentSnapshot.data().starCount);
          if (documentSnapshot.data().starCount == 60) {
            setBadgeEnd(Image.resolveAssetSource(Badge).uri);
          }
        });
    };

    getFullStar();
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
        <Image
          source={Trophy}
          style={{
            height: 80,
            width: 80,
            borderRadius: 0,
            top: 30,
            left: 300,
            transform: [{rotate: '10deg'}],
          }}
          imageStyle={{borderRadius: 1000}}
        />
      </View>
      <View style={styles.view}>
        <Pressable onPress={null} style={styles.container}>
          <Text style={styles.text}>BAŞARIMLARIM</Text>
        </Pressable>
      </View>

      <View style={styles.back}>
        <View style={styles.badge}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{
                uri: badgeSign,
              }}
              style={{
                height: 150,
                width: 100,
                marginTop: 10,
              }}
            />
            <Text style={styles.badgetitle}>MÜDAVİM</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{
                uri: badgeTestCount,
              }}
              style={{
                height: 150,
                width: 100,
                marginTop: 10,
              }}
            />
            <Text style={styles.badgetitle}>ÇÖZMATİK</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{
                uri: badgeHint,
              }}
              style={{
                height: 150,
                width: 100,
                marginTop: 10,
              }}
            />
            <Text style={styles.badgetitle}>DEDEKTİF</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{
                uri: badgeMaster,
              }}
              style={{
                height: 150,
                width: 100,
                marginTop: 10,
              }}
            />
            <Text style={styles.badgetitle}>GALAKSİ</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{
                uri: badgeEnd,
              }}
              style={{
                height: 150,
                width: 100,
                marginTop: 10,
              }}
            />
            <Text style={styles.badgetitle}>İŞ BİTİRİCİ</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{
                uri: badgeTime,
              }}
              style={{
                height: 150,
                width: 100,
                marginTop: 10,
              }}
            />
            <Text style={styles.badgetitle}>"U"ZAMAN</Text>
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
    bottom: 0,
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '90%',
    height: '55%',
    borderColor: '#e8e8e8',
    borderWidth: 0.5,
    borderRadius: 40,
    elevation: 0.5,
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
    top: 17,
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

    top: 10,

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
export default Achivement;
