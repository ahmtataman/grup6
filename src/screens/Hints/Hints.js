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

const Hints = ({navigation: {navigate}}) => {
  const {height} = useWindowDimensions();
  const [textSelect, setTextSelect] = useState([
    {title: 'Hassas belgeleri imha edin!'},
    {title: 'Antivirüs yazılımınızı güncel tutun.'},
    {title: 'Çift katmanlı güvenlik kullanın'},
    {
      title: 'Hassas verileri girmenizi isteyen şüpheli e-postaları açmayın!',
    },
    {title: 'Hesaplarınız için güçlü parolalar seçiniz!'},
    {title: 'deneme2'},
    {title: 'deneme1'},
    {title: 'deneme2'},
    {title: 'deneme1'},
    {title: 'deneme2'},
    {title: 'deneme1'},
    {title: 'deneme2'},
    {title: 'deneme2'},
    {title: 'deneme1'},
  ]);

  return (
    <View>
      <View style={styles.MainContainer}>
        <TouchableOpacity
          style={[styles.backbutton]}
          onPress={() => navigate('start')}
        >
          <Image source={BackButton} style={[styles.backbutton]} />
        </TouchableOpacity>
        <View style={styles.hinter}>
          <Text style={styles.title}>İPUÇLARI</Text>
          <Text style={styles.title}>foto</Text>
          {/* <Image source={Hint} style={[styles.logo]} /> */}
        </View>
      </View>
      {/* <ScrollView style={styles.scrollView}> */}

      <FlatList
        numColumns={3}
        data={textSelect}
        renderItem={({item}) => (
          <TouchableOpacity
            // style={styles.MainContainer}
            activeOpacity={0.5}
            onPress={() => navigate('hintshow', {title: item.title})}
          >
            <Image
              source={HintPage}
              style={[styles.page, {height: height * 0.25}]}
            />
          </TouchableOpacity>
        )}
      />

      {/* </ScrollView> */}
      {/* <Pressable onPress={() => navigate('start')} style={styles.exit}>
        <Text style={styles.textexit}>GERİ GİT</Text>
      </Pressable> */}
    </View>
  );
};
const styles = StyleSheet.create({
  backbutton: {
    // left: 20,
    // bottom: 410,
    // // position: 'absolute',
    maxWidth: 40,
    maxHeight: 40,
    // resizeMode: 'contain',
  },
  list: {
    flex: 1,
    // alignItems: 'center',
  },
  title: {
    position: 'absolute',
    // top: -72,

    fontSize: 22,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  MainContainer: {
    padding: 20,
    // top: 120,
    // flex: ,
    alignItems: 'center',
    // justifyContent: 'space-around',
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  hinter: {
    position: 'relative',
    display: 'flex',
    minWidth: '70%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
  },

  textsize: {
    textAlign: 'center',
    color: 'black',
    // paddingBottom: 14,
  },
  page: {
    maxWidth: 130,
    maxHeight: 130,
    // resizeMode: 'contain',
  },
  logo: {
    width: 100,
    height: 100,
    // top: -150,
    // left: 15,
    // position: 'absolute',
    // maxWidth: 200,
    // maxHeight: 200,
    resizeMode: 'contain',

    // position: 'absolute',
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
  // view: {
  //   // flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   position: 'absolute',
  // },
  textexit: {
    left: 10,
    fontSize: 15,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  // exit: {
  //   shadowColor: 'black',
  //   shadowOpacity: 0.8,
  //   elevation: 6,
  //   backgroundColor: '#0000',
  //   shadowRadius: 15,
  //   shadowOffset: {width: 56, height: 13},
  //   borderWidth: 0,
  //   borderRadius: 0,
  //   position: 'absolute',
  //   // top: 500,

  //   padding: 10,
  //   marginHorizontal: 10,
  //   marginVertical: 20,
  //   backgroundColor: '#47A6D7',
  //   width: '30%',
  //   borderRadius: 25,
  // },
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
