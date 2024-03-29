import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import Loading from '../../loadingcomponent/loading';
import {getData, storeData} from '../../utils/AsyncStorag';
import Snackbar from 'react-native-snackbar';
import {useLogin} from '../../utils/LoginproviderContext';

const Verify = ({navigation, route}) => {
  const colorScheme = useColorScheme();
  const {data} = route.params;
  const pin1ref = useRef(null);
  const pin2ref = useRef(null);
  const pin3ref = useRef(null);
  const pin4ref = useRef(null);
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [seconds, setSeconds] = useState(60);
  const [load, setload] = useState(false);
  const {setIsLoggedin} = useLogin();
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(interval);
        // You can add additional logic when the timer reaches 0
        // For example, show a message, trigger an action, etc.
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [seconds]);
  const handleVerification = async () => {
    try {
      setload(true);
      if (pin1 && pin2 && pin3 && pin4) {
        // const otp = pin1 + pin2 + pin3 + pin4;
        const id = await getData('uid');
        const requestBody = {
          user_id: id,
          otp_digit_one: pin1,
          otp_digit_two: pin2,
          otp_digit_three: pin3,
          otp_digit_four: pin4,
        };
        console.log(requestBody);
        const response = await axios.post(
          'https://newannakadosa.com/api/otp/confirm/',
          requestBody,
        );
        if (response.data.status === 'danger') {
          Snackbar.show({
            text: 'Wrong Pin ,Enter correct Otp.',
            textColor: 'white',
            backgroundColor: 'red',
            duration: Snackbar.LENGTH_SHORT,
            marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
          });

          console.log('response', response.data);
          setload(false);
          return;
        } else {
          // if (!!data?.name && !!data?.email) {
          //   await storeData('id', data?.id);
          //   setIsLoggedin(true);
          //   Snackbar.show({
          //     text: 'Loggedin Successfully.',
          //     textColor: 'white',
          //     backgroundColor: 'green',
          //     duration: Snackbar.LENGTH_SHORT,
          //     marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
          //   });
          // } else {
          console.log('response', response.data.message);
          navigation.replace('Signup');
          setload(false);
          // }
        }
      } else {
        setload(false);
        Snackbar.show({
          text: 'Please enter a 4 digit pin.',
          textColor: 'white',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
          marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
        });
        //navigation.replace('Address');
      }
    } catch (error) {
      setload(false);
      Alert.alert('Wrong Pin');
      console.error('API error:', error);
      // Handle API error if needed
    }
  };
  if (load) {
    return <Loading />;
  }
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../assets/introscreenassets/background.jpeg')}
        style={{width: '100%', height: '100%'}}>
        <TouchableOpacity
          onPress={() => navigation.replace('SignIn')}
          style={{marginLeft: 25, marginTop: 30}}>
          <Image
            source={require('../../assets/iconsassets/left-arrow.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <View
          style={{
            //flex: 1,
            margin: 20,
            marginTop: 30,
            //  justifyContent: 'space-evenly',
          }}>
          {/* </View> */}
          <View>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 25,
                fontWeight: 'bold',
                color: 'black',
                textAlign: 'center',
              }}>
              Verify your phone number
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                //fontWeight: 'bold',
                color: 'black',
                marginBottom: 5,
              }}>
              Please enter 4-digit verification code sent by SMS to
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginBottom: 20,
              }}>
              +91{data.phone}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <TextInput
                ref={pin1ref}
                style={{
                  color: colorScheme === 'dark' ? 'green' : 'black', // Updated this line
                  backgroundColor: 'white',
                  width: 60,
                  height: 60,
                  borderRadius: 40,
                  borderWidth: 1,
                  marginHorizontal: 5,
                  fontSize: 20,
                  textAlign: 'center',

                  borderColor: 'white',
                }}
                keyboardType="numeric"
                maxLength={1}
                value={pin1}
                onChangeText={input => {
                  setPin1(input);
                  if (input !== '') {
                    pin2ref.current.focus();
                  }
                }}
                placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'gray'}
              />
              <TextInput
                ref={pin2ref}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 40,
                  borderWidth: 1,
                  marginHorizontal: 5,
                  fontSize: 20,
                  textAlign: 'center',
                  color: colorScheme === 'dark' ? 'green' : 'black', // Updated this line
                  backgroundColor: 'white',
                  borderColor: 'white',
                }}
                keyboardType="numeric"
                maxLength={1}
                value={pin2}
                onChangeText={input => {
                  setPin2(input);
                  if (input !== '') {
                    pin3ref.current.focus();
                  }
                }}
              />
              <TextInput
                ref={pin3ref}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 40,
                  borderWidth: 1,
                  marginHorizontal: 5,
                  fontSize: 20,
                  textAlign: 'center',
                  color: colorScheme === 'dark' ? 'green' : 'black', // Updated this line
                  backgroundColor: 'white',
                  borderColor: 'white',
                }}
                keyboardType="numeric"
                maxLength={1}
                value={pin3}
                onChangeText={input => {
                  setPin3(input);
                  if (input !== '') {
                    pin4ref.current.focus();
                  }
                }}
              />
              <TextInput
                ref={pin4ref}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 40,
                  borderWidth: 1,
                  marginHorizontal: 5,
                  fontSize: 20,
                  textAlign: 'center',
                  color: colorScheme === 'dark' ? 'green' : 'black', // Updated this line
                  backgroundColor: 'white',
                  borderColor: 'white',
                  textDecorationColor: 'black',
                }}
                keyboardType="numeric"
                maxLength={1}
                value={pin4}
                onChangeText={setPin4}
              />
            </View>
            <TouchableOpacity
              onPress={handleVerification}
              style={{
                backgroundColor: 'green',
                padding: 15,
                alignSelf: 'center',
                borderRadius: 40,
                marginTop: 40,
              }}>
              <Text style={{fontSize: 16, color: 'yellow', fontWeight: 'bold'}}>
                Continue
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                //fontWeight: 'bold',
                color: 'black',
                marginTop: 25,
                marginBottom: 5,
              }}>
              Didn't you recieve any code ?
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 17,

                  color: 'red',
                  marginBottom: 20,
                }}>
                Resend new code
              </Text>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 2,
                height: 110,
                width: 110,
                alignSelf: 'center',
                borderRadius: 60,
                padding: 20,
                borderStyle: 'dashed',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 25,

                  color: 'black',
                  // marginBottom: 5,
                }}>
                {seconds}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  color: colorScheme === 'dark' ? 'black' : 'black', // Updated this line

                  marginBottom: 20,
                }}>
                Sec left
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Verify;

const styles = StyleSheet.create({});
