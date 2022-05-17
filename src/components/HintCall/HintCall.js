import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton2 from '../CustomButton2/CustomButton2';
import Hint from '../../../assets/images/hint.png';
import HintPage from '../../../assets/images/sticky-note.png';
// import HintsShow from './src/components/HintsShow';
// import ImageViewer from 'react-native-image-zoom-viewer';

const HintCall = ({navigation, hinttext}) => {
  const {height} = useWindowDimensions();
  const {width} = useWindowDimensions();
  const [text, setText] = useState('Make Text Bigger');
  const [wi, setWi] = useState('');
  const [he, setHe] = useState('');
  const üyeol = () => {
    console.warn('üyelik');
  };

  return (
    <View style={styles.HintPage}>
      <Text style={[styles.textsize]}>
        {/* Hassas belgeleri {'\n'}imha edin! */}
        {hinttext}
      </Text>

      <Pressable
        onPress={() => navigation.navigate('hint')}
        style={styles.exit}
      >
        <Text style={styles.textexit}>GERİ GİT</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    top: 68,
    fontSize: 35,
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
  HintPage: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  textsize: {
    // position: 'absolute',
    top: -300,
    // right: 110,
    fontSize: 35,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    // numberOfLines: 2,
  },
  page: {
    top: -50,
    maxWidth: 1000,
    maxHeight: 1000,
    resizeMode: 'contain',
  },
  logo: {
    // top: 15,
    // left: 15,

    maxWidth: 300,
    maxHeight: 300,
    resizeMode: 'contain',
  },
  // shadow: {
  //   shadowColor: 'black',
  //   shadowOpacity: 0.8,
  //   elevation: 6,
  //   backgroundColor: '#0000',
  //   shadowRadius: 15,
  //   shadowOffset: {width: 56, height: 13},
  //   borderWidth: 0,
  //   borderRadius: 0,
  //   // elevation: 5,
  // },
  view: {
    // flexDirection: 'column',
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
    // justifyContent: 'center',
  },
});

export default HintCall;
