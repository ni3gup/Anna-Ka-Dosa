import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import Loading from '../loadingcomponent/loading';
import {getData} from '../utils/AsyncStorag';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';

const Feedback = ({navigation}) => {
  const colorScheme = useColorScheme();
  const [defaultrating, setdefaultrating] = useState(1);
  const [starmp, setstarmp] = useState([1, 2, 3, 4, 5]);
  const [feedback, setFeedback] = useState('');
  const [load, setLoad] = useState(false);
  const handlesubmit = async () => {
    setLoad(true);
    try {
      if (feedback.trim() === '') {
        Alert.alert('Please write feedback first');
        return;
      }
      const id = await getData('id');
      console.log(id);
      const body = {
        user_id: id,
        review: feedback,
        rating: defaultrating,
      };
      console.log(body);
      const response = await axios.post(
        'https://newannakadosa.com/api/send/feedback',
        body,
      );
      console.log(response);
      Snackbar.show({
        text: 'Your Feedback has been sent😁',
        textColor: 'white',
        backgroundColor: 'green',
        duration: Snackbar.LENGTH_LONG,
        marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      });
      setFeedback('');
      setdefaultrating(1);
      navigation.replace('Main');
    } catch (err) {
      console.log('Error in submitting feedback', err);
      Snackbar.show({
        text: 'Error ,Your feedback has not been sent!😥',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_LONG,
        marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      });
      // Alert.alert( '  ');
      setFeedback('');
      setdefaultrating(1);
      navigation.replace('Main');
    } finally {
      setLoad(false);
    }
  };

  if (load) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{backgroundColor: '#fed920', padding: 9, flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/iconsassets/left-arrow.png')}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            fontSize: 22,
            //sfontWeight: 'bold',
            color: 'black',
            marginLeft: 20,
            textAlignVertical: 'center',
          }}>
          Send Feedback & Rate us
        </Text>
      </View>
      <ScrollView style={{margin: 20}} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={{fontSize: 23, color: 'black', fontWeight: 'bold'}}>
            Send Feedback
          </Text>
        </View>
        <View
          style={{
            marginVertical: 20,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: colorScheme === 'dark' ? 'gray' : 'gray',
            }}>
            Tell us what you love about the app,or what we could be doing
            better.
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
            marginVertical: 20,
            flex: 1,
          }}>
          <TextInput
            style={{
              fontSize: 16,
              color: colorScheme === 'dark' ? 'black' : 'black',
            }}
            placeholder="Enter Feedback"
            placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'gray'}
            onChangeText={setFeedback}
            value={feedback}
          />
        </View>

        <View style={{alignSelf: 'center', marginVertical: 10}}>
          <Text
            style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}></Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
          }}>
          {starmp.map((item, key) => (
            <TouchableOpacity
              //activeOpacity={}
              key={item}
              onPress={() => setdefaultrating(item)}>
              <Image
                source={
                  item <= defaultrating
                    ? require('../assets/iconsassets/rate-usy.png')
                    : require('../assets/iconsassets/rate-usb.png')
                }
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{marginVertical: 25}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              color: colorScheme === 'dark' ? 'gray' : 'gray',
            }}>
            Your word makes Anna Ka Dosa a better place.You are the influencer.
          </Text>
        </View>
        <TouchableOpacity
          onPress={handlesubmit}
          style={{
            backgroundColor: 'green',
            padding: 15,
            alignSelf: 'center',
            borderRadius: 40,
            marginTop: 25,
          }}>
          <Text style={{fontSize: 16, color: 'yellow', fontWeight: 'bold'}}>
            Submit Feedback
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feedback;

const styles = StyleSheet.create({});
