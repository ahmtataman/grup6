import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Button,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton2 from '../../components/CustomButton2/CustomButton2';
import Hint from '../../../assets/images/hint.png';
import HintPage from '../../../assets/images/sticky-note.png';
import BackButton from '../../../assets/images/back.png';

const Hints = ({route: {params}, navigation}) => {
  const {height} = useWindowDimensions();
  // const [textSelect, setTextSelect] = useState([
  //   {title: 'deneme1'},
  //   {title: 'deneme2'},
  // ]);
  const {title} = params;
  return (
    <View style={styles.MainContainer}>
      <Image source={Hint} style={[styles.logo, {height: height * 0.25}]} />
      <Text style={styles.title}>İPUÇLARI</Text>

      <TouchableOpacity
        style={styles.page}
        activeOpacity={0.5}
        // onPress={() => navigation.navigate('hint')}
      >
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
    // padding: 20,
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
    // right: 110,
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
    // top: 15,
    // left: 15,

    maxWidth: 200,
    maxHeight: 200,
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
export default Hints;
