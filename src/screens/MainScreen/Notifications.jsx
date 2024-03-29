import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {getData} from '../../utils/AsyncStorag';
import Loading from '../../loadingcomponent/loading';
const Notifications = ({navigation}) => {
  const [load, setLoad] = useState(false);
  const [notificationdata, setNotificationdata] = useState(null);
  const colorScheme = useColorScheme();
  // const [deviceToken, setDeviceToken] = useState(null);
  // useEffect(() => {
  //   getDeviceToken();
  // }, []);
  // //console.log(deviceToken);
  // //serverkey AAAAs0jTPBU:APA91bGft03RZLJeDRv8nXem1z2hSLXDXCEFAcD1o09Pyw5L3YZYFGEoMB1JwCF1IcOnBBlf5CigSPeBMxNL9Kocfx3R7mpSkccsCdBVitPFGJdo6DxvcZS2Jze5uQ58-3kgC0g-RzO0
  // //device id ebuXDP1MQLCeiOW0Fv5Huv:APA91bGiJXU65laQVEDLL3tE4yt7fuLxb_WTJKNVoZUr4V-UWZf0PmszXswPVlmV-ZAGBPDEiMfkjPopALwTdS9xTlzaMAs6jQTO0OIYSysY6-jeNIS4VqKfxdL5DR1PWU9SEm0fjb4k
  // const getDeviceToken = async () => {
  //   try {
  //     const token = await messaging().getToken();
  //     setDeviceToken(token);
  //     console.log('Device token', token);
  //   } catch (error) {
  //     console.error('Error getting device token:', error);
  //   }
  // };
  useFocusEffect(
    useCallback(() => {
      //  if (!route.params) {
      fetchData();
      //  } else {
      //    const data = route.params.offercartdata;
      //    const coupon = route.params.coupon;
      //    setoffercode(coupon);
      //    setOfferCartData(data);
      //    setCartData(data);
      //  }
    }, [fetchData]),
  );

  const fetchData = async () => {
    const id = await getData('id');

    try {
      setLoad(true);
      const apiUrl = 'https://newannakadosa.com/api/notification';

      const response = await axios.post(apiUrl, {
        user_id: id,
      });

      setNotificationdata(response.data.data);
      setLoad(false);
      console.log(response.data.data);

      //setDiscount(null);
    } catch (error) {
      setLoad(false);

      console.error('Error fetching data:', error);
    }
  };
  if (load) {
    return <Loading color={'white'} />;
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          backgroundColor: '#fed920',
          padding: 10,
          flexDirection: 'row',

          // paddingHorizontal: 15,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Image
            source={require('../../assets/iconsassets/menu.png')}
            style={{
              width: 26,
              height: 26,
              marginTop: 7,
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <TouchableOpacity style={{flexDirection: 'row', marginLeft: 5}}>
            <Text style={{color: 'gray'}}> Outlet</Text>
            {/* <Image
              source={require('../../assets/iconsassets/dropdown.png')}
              style={{height: 15, width: 15, marginTop: 3, marginLeft: 3}}
            /> */}
          </TouchableOpacity>
          <Text
            style={{
              // flex: 1,
              fontSize: 14,
              fontWeight: 'bold',
              color: 'green',
              marginLeft: 10,
              textAlignVertical: 'center',
              marginBottom: -6,
            }}>
            Kalkaji Extn,Kalkaji,Delhi 110045
          </Text>
        </View>
        <TouchableOpacity
          style={{margin: 3, borderRadius: 60, overflow: 'hidden'}}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../../assets/iconsassets/user-photo.png')}
            style={{
              width: 28,
              height: 28,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 20}}>
        <View style={{marginVertical: 20}}>
          <Text
            style={{
              //flex: 1,
              fontSize: 25,
              fontWeight: 'bold',
              color: colorScheme === 'dark' ? 'black' : 'black',
              // marginLeft: 10,
              //textAlignVertical: 'center',
              //  marginBottom: -6,
            }}>
            Notification
          </Text>
        </View>
        {notificationdata?.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                //alignSelf: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: colorScheme === 'dark' ? 'lightgray' : 'lightgray',
              }}>
              No Notifications yet!!
            </Text>
          </View>
        ) : (
          notificationdata?.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,
                marginBottom: 10,
              }}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  backgroundColor: '#fed920',
                  // padding: 10,
                  borderRadius: 10,
                  marginRight: 10,
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'green',
                    textAlign: 'center',
                    marginTop: 5,
                  }}>
                  NF
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: colorScheme === 'dark' ? 'black' : 'black',
                  }}>
                  {item?.title}
                </Text>
                <Text
                  style={{
                    color: colorScheme === 'dark' ? 'black' : 'black',
                    marginBottom: 5,
                  }}>
                  {item?.description}
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    color: colorScheme === 'dark' ? 'darkgray' : 'darkgray',
                  }}>
                  {new Date(item?.created_at).toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
