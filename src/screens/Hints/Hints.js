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
    {title: 'Verilerinizi mutlaka yedekleyin!'},
    {title: 'Şifrelerinizi kimse ile paylaşmayın'},
    {title: 'Kaynağını bilmediğiniz e-postaları açmayınız'},
    {title: 'Sosyal ağlarda kişisel bilgileri paylaşmayın'},
    {title: 'Yüklediğiniz fotoğraflarda konum bilgisi olmamasına dikkat edin'},
    {title: '"Şifremi Hatırla" butonuna basmasanız daha iyi olur'},
    {title: 'Kaynağından emin olmadıkça verilen linklere tıklamayınız'},
    {title: 'Ortak kullanılan cihazlarda hesaplarınızdan utlaka çıkış yapın'},
    {title: 'Şifresiz ve ortak ağlara bağlanırken dikkatli olun'},
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
          <Pressable onPress={console.log('first')} style={styles.but}>
            <Text style={styles.text}>İPUÇLARI</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        numColumns={3}
        data={textSelect}
        renderItem={({item}) => (
          <TouchableOpacity
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
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  but: {
    padding: 10,
    backgroundColor: '#47A6D7',
    width: '75%',
    borderRadius: 25,
    alignItems: 'center',
  },
  backbutton: {
    maxWidth: 40,
    maxHeight: 40,
  },
  list: {
    flex: 1,
  },
  title: {
    position: 'absolute',
    fontSize: 22,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
  },
  MainContainer: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  hinter: {
    position: 'relative',
    display: 'flex',
    minWidth: '70%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textsize: {
    textAlign: 'center',
    color: 'black',
  },
  page: {
    maxWidth: 130,
    maxHeight: 130,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  textexit: {
    left: 10,
    fontSize: 15,
    fontFamily: 'Exo2-VariableFont_wght',
    color: 'white',
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
