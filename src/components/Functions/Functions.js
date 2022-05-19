const uploadImage = async () => {
  // }
  // console.log(user);
  const URL = image;
  let filename = 'test';
  console.log(URL);
  try {
    await storage()
      .ref(filename)
      .putFile(URL);
    Alert.alert('Fotoğraf Yüklendi!');
  } catch (e) {
    console.log('error upload');
  }
};
export default uploadImage;
