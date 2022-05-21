import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, setState} from 'react';
import Hint from '../../../assets/images/hint.png';
import HintPage from '../../../assets/images/sticky-note.png';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Hints = ({route: {params}, navigation}) => {
  const {height} = useWindowDimensions();
  const {title} = params;
  var user = auth().currentUser;
  var name, email, uid, emailVerified, hintCount;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    emailVerified = user.emailVerified;
    uid = user.uid;
  } else {
    console.log('no user');
  }

  //Her ipucuna tıklandığında db üzerindeki veriyi arttırmak için
  useEffect(() => {
    const updateHintCount = async () => {
      const postReference = firestore().doc(`person/${user.uid}`);
      firestore().runTransaction(async transaction => {
        // person içinden verileri çekmek için
        const postSnapshot = await transaction.get(postReference);

        if (!postSnapshot.exists) {
          throw 'Kayıt yok!';
        }

        transaction.update(postReference, {
          hintViewCount: postSnapshot.data().hintViewCount + 1,
        });
        // console.log(hintViewCount);
      });
    };

    updateHintCount();
  }, []);

  return (
    <View style={styles.MainContainer}>
      <Image source={Hint} style={[styles.logo, {height: height * 0.25}]} />
      <Text style={styles.title}>İPUÇLARI</Text>

      <TouchableOpacity style={styles.page} activeOpacity={0.5}>
        <Image
          source={HintPage}
          style={[styles.page, {height: height * 0.58}]}
        />
        <View style={styles.HintPage}>
          <Text style={styles.textsize}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  HintPage: {
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    position: 'absolute',
    top: 77,
    fontSize: 22,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  MainContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  textsize: {
    top: -330,
    fontSize: 35,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  page: {
    top: -50,

    maxWidth: 400,
    maxHeight: 400,
    resizeMode: 'contain',
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
    resizeMode: 'contain',
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
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
    position: 'absolute',
    top: 600,

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
  },
});
export default Hints;
