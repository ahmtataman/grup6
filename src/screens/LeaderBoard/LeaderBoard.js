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
import King from '../../../assets/images/king.png';
import firestore from '@react-native-firebase/firestore';

const LeaderBoard = ({navigation}) => {
  //Profil resmi için placeholder
  const ImageUri = Image.resolveAssetSource(ProfilePlaceHolder).uri;
  const [image, setImage] = useState(ImageUri);
  const [LeaderArray, setLeaderArray] = useState([]);

  // let LeaderArray = ['1', '2'];
  //currentUser bilgilerini dbden çekmek için
  var user = auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  var arrayNames = '';
  var string = 'ahmet';
  // LeaderArray.push(string);

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }

  // console.log(name);

  //fonksiyon lifecycle, başta tüm dökümandaki kullanıcıların
  //yıldız sayılarına göre azalan şeklinde sıralıyor.
  //daha sonra sırası ile array içine yerleştiriyor.
  //Yerleştirilen elemanları sırasına göre lider tahtasına yazdırmak için
  const clearArray = () => {
    setLeaderArray([]);
  };
  useEffect(() => {
    const getQuery = async () => {
      firestore()
        .collection('person')
        .orderBy('starCount', 'desc') //çoktan aza doğru sıralaması için
        .limit(5) //sadece ilk 5 entry yi getirmesi için
        .get()
        .then(querySnapshot => {
          console.log('Total users: ', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            // console.log('User Names: ', documentSnapshot.data().name);
            LeaderArray.push(documentSnapshot.data().name);
          });
        });
    };

    getQuery();
  }, []);

  console.log(LeaderArray);
  console.log(LeaderArray[0]);

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
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#F1F9FF',
      }}
    >
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

      <View style={styles.view}>
        <Pressable
          onPress={() => navigation.navigate('lider')}
          style={styles.container2}
        >
          <Image
            source={King}
            style={{
              bottom: 41,
              left: 175,
              height: 80,
              width: 80,
              transform: [{rotate: '15deg'}],
              position: 'absolute',
              // elevation: 10,
              // borderRadius: 20,
              // rotation: -35,
            }}
          />
          <Text style={styles.text2}>LİDER TAHTASI</Text>
        </Pressable>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.number}>1.</Text>

          <Pressable
            onPress={() => navigation.navigate('start')}
            style={styles.container}
          >
            <Text style={styles.text}>{LeaderArray[0]}</Text>
          </Pressable>
          <Image
            source={King}
            style={{
              bottom: 15,
              left: 50,
              height: 50,
              width: 50,
              transform: [{rotate: '-40deg'}],
              position: 'absolute',
              // elevation: 10,
              // borderRadius: 20,
              // rotation: -35,
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.number}>2.</Text>
          <Pressable
            onPress={() => navigation.navigate('achive')}
            style={styles.container}
          >
            <Text style={styles.text}>{LeaderArray[1]}</Text>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.number}>3.</Text>
          <Pressable
            onPress={() => navigation.navigate('lider')}
            style={styles.container}
          >
            <Text style={styles.text}>{LeaderArray[2]}</Text>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.number}>4.</Text>
          <Pressable
            onPress={() => navigation.navigate('profile')}
            style={styles.container}
          >
            <Text style={styles.text}>{LeaderArray[3]}</Text>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.number}>5.</Text>
          <Pressable
            onPress={() => navigation.navigate('analiz')}
            style={styles.container}
          >
            <Text style={styles.text}>{LeaderArray[4]}</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            navigation.navigate('main');
            clearArray();
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
  number: {
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    borderWidth: 0,
    top: 20,
    textAlign: 'center',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#47A6D7',
    width: '10%',
    borderRadius: 25,
    color: 'white',
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
  },
  texttitle: {
    fontFamily: 'computer_7',
    fontSize: 40,
  },
  logo: {
    top: 10,
    maxWidth: 300,
    maxHeight: 300,
    resizeMode: 'contain',
  },
  view: {
    width: '120%',
    top: 150,
    alignItems: 'center',
  },
  textexit: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  exit: {
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 6,

    borderWidth: 0,
    borderRadius: 0,

    top: 60,

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

    borderWidth: 0,
    borderRadius: 0,
    top: 20,

    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#47A6D7',
    width: '55%',
    borderRadius: 25,
  },
  container2: {
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
  text: {
    textAlign: 'center',
    padding: 0,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  text1: {
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  text2: {
    textAlign: 'center',
    padding: 5,
    fontSize: 25,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  text3: {
    // left: 65,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  text4: {
    // left: 35,
    fontSize: 20,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
});

export default LeaderBoard;
