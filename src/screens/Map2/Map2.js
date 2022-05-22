import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.baslikalan}>
            <Text style={styles.baslik}>ONLİNE OYUN</Text>
          </View>

          <View style={styles.bitistir}>
            <TouchableOpacity
              style={{width: 80, height: 80, margin: 11}}
              onPress={() => this.props.navigation.navigate('test')}
            >
              <Image
                style={styles.Image}
                source={require('../../../assets/images/5a.png')}
              />
              <View style={styles.btn}>
                <Text style={styles.btntext}>Cihaz Güvenliği</Text>
              </View>
            </TouchableOpacity>
            <Image
              style={styles.ok2}
              source={require('../../../assets/images/ok2.png')}
            />
          </View>

          <View style={styles.bitistir}>
            <Image
              style={styles.ok1}
              source={require('../../../assets/images/ok.png')}
            />
            <TouchableOpacity
              style={styles.TouchableOpacity1}
              onPress={() => this.props.navigation.navigate('test')}
            >
              <Image
                style={styles.Image}
                source={require('../../../assets/images/4a.png')}
              />
              <View style={styles.btn}>
                <Text style={styles.btntext}>Karakter Hırsızlığı</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.bitistir}>
            <TouchableOpacity
              style={{width: 80, height: 80, margin: 11}}
              onPress={() => this.props.navigation.navigate('test')}
            >
              <Image
                style={styles.Image}
                source={require('../../../assets/images/3a.png')}
              />
              <View style={styles.btn}>
                <Text style={styles.btntext}>Dolandırıcılık</Text>
              </View>
            </TouchableOpacity>
            <Image
              style={styles.ok2}
              source={require('../../../assets/images/ok2.png')}
            />
          </View>

          <View style={styles.bitistir}>
            <Image
              style={styles.ok1}
              source={require('../../../assets/images/ok.png')}
            />
            <TouchableOpacity
              style={styles.TouchableOpacity1}
              onPress={() => this.props.navigation.navigate('test')}
            >
              <Image
                style={styles.Image}
                source={require('../../../assets/images/2a.png')}
              />
              <View style={styles.btn}>
                <Text style={styles.btntext}>Zorbalık</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.bitistir}>
            <TouchableOpacity
              style={styles.TouchableOpacity1}
              onPress={() => this.props.navigation.navigate('test')}
            >
              <Image
                style={styles.Image}
                source={require('../../../assets/images/1a.png')}
              />
              <View style={styles.btn}>
                <Text style={styles.btntext}>Cihaz Güvenliği</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {paddingTop: 50, flex: 1, flexDirection: 'column'},
  bitistir: {flexDirection: 'row', marginBottom: 100},
  ok1: {width: 250, height: 150, marginLeft: 15},
  ok2: {width: 250, height: 150, marginLeft: 25},
  btn: {
    width: 100,
    height: 25,
    backgroundColor: '#0a9bff',
    marginLeft: 15,
    marginTop: 5,
    borderRadius: 10,
  },
  TouchableOpacity1: {width: 80, height: 80, margin: 10},
  btntext: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  baslikalan: {
    backgroundColor: 'lightskyblue',
    justifyContent: 'flex-end',
    marginLeft: 245,
    width: 155,
    borderRadius: 25,
  },
  Image: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderRadius: 25,
    marginLeft: 15,
  },
  baslik: {textAlign: 'center', marginTop: 4, fontSize: 20, fontWeight: '700'},
});
