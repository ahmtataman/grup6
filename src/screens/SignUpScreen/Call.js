import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import ProfilePlaceHolder from '../../../assets/images/profile_empty.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import TextButton from '../../components/TextButton';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const Call = () => {
  // console.log(ProfilePlaceHolder)
  const ImageUri = Image.resolveAssetSource(ProfilePlaceHolder).uri;
  const [image, setImage] = useState(ImageUri);
  const [imageUrl, setImageUrl] = useState('');

  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const {height} = useWindowDimensions();

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      // console.log(image);
      setImage(image.path);
      uploadImage(image.path);
    });
  };
  const uploadImage = async test => {
    // }
    // console.log(user);
    // const URL = image;
    console.log(test);

    let filename = 'test';
    // console.log(URL);
    try {
      await storage()
        .ref(filename)
        .putFile(test);
      Alert.alert('Fotoğraf Yüklendi!');
    } catch (e) {
      console.log(e);
    }
  };
  // console.log(ImageUri)
  return (
    <View style={styles.container}>
      {/* <Button
          onPress={async () => {
            // path to existing file on filesystem
            const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`
            // uploads file
            await reference.putFile(pathToFile)
          }}
        /> */}
      <View style={{alignItems: 'center'}}>
        <ImageBackground
          source={{
            uri: image,
          }}
          style={{
            height: 400,
            width: 400,
            top: -320,
            right: 50,
            opacity: 0.3,
            position: 'absolute',
            // borderWidth: 0.5,
            // borderRadius: 500,
          }}
          imageStyle={{borderRadius: 1000}}
        />
        <TouchableOpacity onPress={choosePhotoFromLibrary}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ImageBackground
              source={{
                uri: image,
              }}
              style={{
                height: 100,
                width: 100,
                position: 'absolute',
                top: -80,
                // right: 130,
                // borderWidth: 5,

                // shadowColor: '#202020',
                // shadowOffset: { width: 5, height: 5 },
                // shadowRadius: 5,

                // borderRadius: 500,
              }}
              imageStyle={{borderRadius: 1000}}
            />
          </View>
        </TouchableOpacity>
        {/* <Text style={styles.text2}>PROFIL</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    // padding: 10,
    maxWidth: 400,
    maxHeight: 400,
    resizeMode: 'contain',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    // image: Image,
    // padding: 13,
    // borderRadius: 10,
    // backgroundColor: '#FF6347',
    // alignItems: 'center',
    // marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  text: {
    top: -10,

    // padding: 10,
    fontFamily: 'computer_7',
    fontSize: 40,
    // left: 45,
  },
  text2: {
    top: 210,
    right: 130,
    fontFamily: 'Anek',
    fontSize: 25,
    color: '#67b2d9',
  },
  logo: {
    // padding: 10,
    maxWidth: 400,
    maxHeight: 400,
    resizeMode: 'contain',
  },
  input: {},
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,

    // top: 70,
    // position: 'absolute',
  },
});
export default Call;
