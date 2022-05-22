import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import questions from '../../../src/components/questions.js';
import ProfilePlaceHolder from '../../../assets/images/profile_empty.png';

const windowWidth = Dimensions.get('window').width;

const Test = ({
  avatarImage = 'https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png',
}) => {
  const ImageUri = Image.resolveAssetSource(ProfilePlaceHolder).uri;
  const [image, setImage] = useState(ImageUri);

  var user = auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }

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

  const [activeQuestionIndex, setActiveQuestion] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState([]);
  const [correctAnswerShowing, setCorrectAnswerShowing] = React.useState(false);
  const [answers, setAnswers] = React.useState([]);

  const question = questions[activeQuestionIndex];
  const isDarkMode = useColorScheme() === 'dark';

  console.log('answers', answers);
  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <View style={styles.headerBackground} /> */}
      <View style={styles.header}>
        <View
          style={{
            // top: 30,
            backgroundColor: '#47A6D7',
            width: '70%',
            height: '70%',
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
                height: 70,
                width: 70,
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
      </View>
      <ScrollView style={styles.scrollArea}>
        <View style={styles.content}>
          {question.video && (
            <View style={styles.videoContainer}>
              <Video
                style={styles.backgroundVideo}
                source={question.video}
                controls={true}
              />
            </View>
          )}
          <Text
            style={[styles.quesText, !question.video && styles.extraQuesText]}
          >
            {question.ques}
          </Text>
        </View>
        {question.options.map((option, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.answerContainer,
                selectedAnswers.indexOf(index) !== -1 && styles.selectedAnswer,
              ]}
              onPress={() => {
                if (correctAnswerShowing) {
                  return;
                }

                if (question.answers.length === 1) {
                  setSelectedAnswers([index]);
                } else {
                  selectedAnswers.indexOf(index) === -1
                    ? setSelectedAnswers([...selectedAnswers, index])
                    : setSelectedAnswers(
                        selectedAnswers.filter(
                          selectedAnswer => selectedAnswer !== index,
                        ),
                      );
                }
              }}
            >
              <Text style={styles.answerText}>{option}</Text>
              {correctAnswerShowing &&
                selectedAnswers.indexOf(index) !== -1 && (
                  <Image
                    style={styles.checkmarkImage}
                    source={
                      question.answers.indexOf(index) === -1
                        ? require('../../../assets/images/wrong.png')
                        : require('../../../assets/images/correct.png')
                    }
                  />
                )}
            </TouchableOpacity>
          );
        })}
        <View style={styles.nextButtonContainer}>
          {question.answers.length > 1 && (
            <Text style={styles.exp}>*Birden fazla seç</Text>
          )}
          <TouchableOpacity
            onPress={() => {
              if (correctAnswerShowing) {
                setAnswers([...answers, selectedAnswers]);
                setCorrectAnswerShowing(false);
                setSelectedAnswers([]);

                if (questions.length - 1 === activeQuestionIndex) {
                  // TODO: remove before release, just for testing... redirect to result page
                  setActiveQuestion(0);
                  //  the answers push to other page
                } else {
                  setActiveQuestion(state => state + 1);
                }
              } else {
                setCorrectAnswerShowing(true);
              }
            }}
          >
            <Image
              style={styles.nextImage}
              source={require('../../../assets/images/next.png')}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const shadow = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.8,
};

const styles = StyleSheet.create({
  checkmarkImage: {
    width: 30,
    height: 30,
    justifySelf: 'flex-end',
  },
  selectedAnswer: {
    backgroundColor: '#09799D',
  },
  nextButtonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
    // left: 100,
    alignItems: 'flex-end',
  },
  page: {
    backgroundColor: '#E4F0FF',
  },
  nextImage: {
    width: 60,
    height: 50,
    resizeMode: 'contain',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  headerBackground: {
    backgroundColor: '#09799D',
    height: 300,
    width: 330,
    borderRadius: 300,
    borderTopRightRadius: 0,
    position: 'absolute',
    top: -150,
    left: -windowWidth / 2 + 150,
    ...shadow,
  },
  header: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  headerText1: {
    fontSize: 16,
    color: '#fff',
    textTransform: 'uppercase',
  },
  headerText2: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase',
  },
  content: {
    paddingVertical: 20,
    backgroundColor: '#09799D',
    elevation: 3,
    borderRadius: 15,
    ...shadow,
  },
  videoContainer: {
    width: '100%',
    height: windowWidth * 0.56,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  quesText: {
    marginTop: 12,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  extraQuesText: {
    fontSize: 20,
  },
  answerContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#6FACC5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadow,
  },
  answerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  scrollArea: {
    height: '100%',
    top: -40,
  },
  exp: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Test;
