import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loading from '../../loadingcomponent/loading';
import {getData, storeData} from '../../utils/AsyncStorag';
import {useLogin} from '../../utils/LoginproviderContext';
import Snackbar from 'react-native-snackbar';
import messaging from '@react-native-firebase/messaging';
const SignIn = ({navigation}) => {
  const [deviceToken, setDeviceToken] = useState(null);
  const colorScheme = useColorScheme();
  useEffect(() => {
    getDeviceToken();
  }, []);
  //console.log(deviceToken);
  //serverkey AAAAs0jTPBU:APA91bGft03RZLJeDRv8nXem1z2hSLXDXCEFAcD1o09Pyw5L3YZYFGEoMB1JwCF1IcOnBBlf5CigSPeBMxNL9Kocfx3R7mpSkccsCdBVitPFGJdo6DxvcZS2Jze5uQ58-3kgC0g-RzO0
  //device id ebuXDP1MQLCeiOW0Fv5Huv:APA91bGiJXU65laQVEDLL3tE4yt7fuLxb_WTJKNVoZUr4V-UWZf0PmszXswPVlmV-ZAGBPDEiMfkjPopALwTdS9xTlzaMAs6jQTO0OIYSysY6-jeNIS4VqKfxdL5DR1PWU9SEm0fjb4k
  const getDeviceToken = async () => {
    try {
      const token = await messaging().getToken();
      setDeviceToken(token);
      console.log('Device token', token);
    } catch (error) {
      console.error('Error getting device token:', error);
    }
  };
  const [number, setnumber] = useState('');
  const [load, setload] = useState(false);
  const {setIsLoggedin} = useLogin();
  const handleSignIn = async () => {
    setload(true);

    try {
      if (number.length === 10) {
        const body = {
          phone: number,
          device_id: deviceToken,
          platform: 'App',
        };
        console.log('body', body);
        const response = await axios.post(
          'https://newannakadosa.com/api/user/loggedin',
          body,
        );
        console.log('sign in API response :', response.data.data);
        console.log('API response id:', response.data.data.id);
        await storeData('uid', response.data.data.id);
        navigation.replace('Verify', {data: response.data.data});
        setload(false);
      } else {
        setload(false);
        Snackbar.show({
          text: 'Please enter valid 10 digit number.',
          textColor: 'white',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
          marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
        });
      }
    } catch (error) {
      setload(false);
      Alert.alert('Something wrong with the server');
      console.error('API error:', error);
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
        {/* <StatusBar backgroundColor={'#ffd10d'} /> */}
        <View
          style={{
            //flex: 1,
            marginHorizontal: 20,
          }}>
          <Image
            source={require('../../assets/iconsassets/Annac.png')}
            style={{
              height: '70%',
              width: '60%',
              alignSelf: 'center',
              marginTop: -50,
            }}
            resizeMode="contain"
          />
          {/* </View> */}
          <View style={{marginTop: -90}}>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 25,
                fontWeight: 'bold',
                color: 'black',
                textAlign: 'center',
              }}>
              Sign in to your account
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                //fontWeight: 'bold',
                color: 'black',
                marginBottom: 20,
              }}>
              We'll send you a verification code to help us keep your account
              safe
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 5,
                overflow: 'hidden',
                //width: '100%',
                //justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  marginLeft: 10,
                  textAlignVertical: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                +91
              </Text>
              <TextInput
                style={{
                  width: '100%',
                  marginLeft: 10,
                  marginBottom: -1,
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: 'black',
                }}
                onChangeText={setnumber}
                value={number}
                placeholder="Enter Phone Number"
                keyboardType="number-pad"
                placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'gray'}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleSignIn}
            style={{
              backgroundColor: 'green',
              padding: 15,
              alignSelf: 'center',
              borderRadius: 40,
              marginTop: 40,
            }}>
            <Text style={{fontSize: 16, color: 'yellow', fontWeight: 'bold'}}>
              Send OTP
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
