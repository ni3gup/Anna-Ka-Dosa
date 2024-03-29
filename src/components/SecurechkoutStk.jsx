import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import axios from 'axios';
import {getData} from '../utils/AsyncStorag';
import {useFocusEffect} from '@react-navigation/native';
import Loading from '../loadingcomponent/loading';
import Snackbar from 'react-native-snackbar';
import RazorpayCheckout from 'react-native-razorpay';
const Securecheckout = ({navigation, route}) => {
  const [select, setselect] = useState(false);
  const {details} = route.params;
  const [defaultaddress, setdefaultaddress] = useState(null);
  const [load, setLoad] = useState(false);
  console.log('details', details);

  useFocusEffect(
    React.useCallback(() => {
      fetchaddress();
    }, []),
  );
  const fetchaddress = async () => {
    const defaultadd = await getData('address');

    if (defaultadd === null) {
      Snackbar.show({
        text: 'Please select your address ',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      });
    } else {
      setdefaultaddress(defaultadd);
      setselect(true);
    }
  };
  // const onPressPayment = async () => {
  //   // console.log('details', details);
  //   setLoad(true);
  //   try {
  //     const id = await getData('id');
  //     const addressid = await getData('addressid');
  //     // const response2 = await axios.post(
  //     //   'https://techiedom.com/annakadosa/api/cod',
  //     //   {user_id: id, order_id: details.order_id, address_id: addressid},
  //     // );
  //     // console.log('Response 2:', response2.data);

  //     const response1 = await axios.post(
  //       'https://newannakadosa.com/api/destroy/cart/',
  //       {user_id: id},
  //     );
  //     console.log('Response 1:', response1.data);
  //     // Handle the responses or perform additional actions as needed
  //     navigation.replace('Paymentcomplete', {details: details});
  //   } catch (error) {
  //     console.error('Error:', error);
  //     // Handle errors appropriately
  //   } finally {
  //     setLoad(false);
  //   }
  // };
  const handleNetbanking = async razdata => {
    setLoad(true);
    try {
      const id = await getData('id');
      console.log('razdata: ' + razdata);
      const response1 = await axios.post(
        'https://newannakadosa.com/api/destroy/cart/',
        {user_id: id},
      );
      console.log('Response 1:', response1.data);
      // Handle the responses or perform additional actions as needed
      navigation.replace('Paymentcomplete', {details: details});
      const response2 = await axios.post(
        'https://newannakadosa.com/api/payment/status',
        {
          user_id: id,
          razorpay_order_id: razdata.razorpay_order_id,
          razorpay_payment_id: razdata.razorpay_payment_id,
          razorpay_signature: razdata.razorpay_signature,
          status: 'success',
        },
      );
    } catch (error) {
      console.error('Error:', error);
      // Handle errors appropriately
    } finally {
      setLoad(false);
    }
  };
  const handlefailedcase = async () => {
    // console.log('details', details);
    setLoad(true);
    try {
      const id = await getData('id');

      const response1 = await axios.post(
        'https://newannakadosa.com/api/payment/status',
        {
          user_id: id,
          status: 'failed',
          razorpay_order_id: details.order_id,
          razorpay_payment_id: '',
          razorpay_signature: '',
        },
      );
      console.log('Response 1:', response1.data);
      navigation.replace('Main');
    } catch (error) {
      console.error('Error:', error);
      // Handle errors appropriately
    } finally {
      setLoad(false);
    }
  };
  const onPressNetbanking = () => {
    var options = {
      description: 'Anna ka dosa payment page',
      //image: 'https://i.imgur.com/3g7nmJC.png',
      //image: require('../assets/iconsassets/Annac.png'),
      currency: 'INR',
      key: 'rzp_test_V7oWtsogFZS70b', // Your API key from Razorpay
      amount: details.total * 100,
      name: 'New Anna Ka Dosa',
      order_id: details.online_order_id,
      prefill: {
        // email: 'void@razorpay.com',
        // contact: '9191919191',
        // name: 'Razorpay Software',
      },
      theme: {
        color: '#fed920',
        //textColor: '#dddddd',
      },
    };

    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        //Alert.alert(`Success: ${data}`);
        handleNetbanking(data);

        console.log('Successfull payement data ', data);
        //"{"razorpay_order_id": "order_NfPYgl0pVQ3S5v", "razorpay_payment_id": "pay_NfPcSAIGQ2UWPo", "razorpay_signature": "d579c1afbd13772e0fc6d8fd64c03720110cf22598d6e9b4cb8ed1458f494f3b"}"
      })
      .catch(error => {
        // handle failure
        Snackbar.show({
          text: 'Payment failed. Please try again',
          textColor: 'white',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
          marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
        });
        handlefailedcase();

        //Alert.alert(`Error: ${error.code} | ${error.description}`);
      });
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
            //  flex: 1,
            fontSize: 22,
            //sfontWeight: 'bold',
            color: 'black',
            marginLeft: 20,
            textAlignVertical: 'center',
          }}>
          Secure Checkout
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{margin: 20}}>
        <View
          style={{
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.8,
            marginBottom: 10,
          }}>
          <View View style={{flexDirection: 'row'}}>
            <View>
              <Image
                source={require('../assets/iconsassets/location.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: 'gray',
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  //  flex: 1,
                  fontSize: 17,
                  //sfontWeight: 'bold',
                  color: 'gray',
                  marginLeft: 10,
                  //textAlignVertical: 'center',
                }}>
                Location
              </Text>
            </View>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Address')}>
              <Text
                style={{
                  //  flex: 1,
                  fontSize: 16,
                  //sfontWeight: 'bold',
                  color: 'red',
                  marginLeft: 20,
                  textAlignVertical: 'center',
                }}>
                Change
              </Text>
            </TouchableOpacity> */}
          </View>
          <View style={{marginVertical: 10, flex: 1}}>
            <Text
              style={{
                //  flex: 1,
                fontSize: 17,
                //sfontWeight: 'bold',
                color: 'black',

                //textAlignVertical: 'center',
              }}>
              {defaultaddress != null ? defaultaddress : 'Select your Address'}
            </Text>
          </View>
        </View>
        {/* <View
          style={{
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.8,
            marginBottom: 10,
          }}>
          <View View style={{flexDirection: 'row', marginVertical: 10}}>
            <View>
              <Image
                source={require('../assets/iconsassets/odering-time.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: 'gray',
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  //  flex: 1,
                  fontSize: 17,
                  //sfontWeight: 'bold',
                  color: 'gray',
                  marginLeft: 20,
                  //textAlignVertical: 'center',
                }}>
                Ordering for:ASAP
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Text
                style={{
                  //  flex: 1,
                  fontSize: 16,
                  //sfontWeight: 'bold',
                  color: 'red',
                  marginLeft: 20,
                  textAlignVertical: 'center',
                }}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
        {/* <View
          style={{
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.8,
            marginBottom: 10,
          }}>
          <View View style={{flexDirection: 'row', marginVertical: 10}}>
            <View>
              <Image
                source={require('../assets/iconsassets/gift-card.png')}
                style={{
                  width: 25,
                  height: 25,
                  // tintColor: 'gray',
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  //  flex: 1,
                  fontSize: 17,
                  //sfontWeight: 'bold',
                  color: 'gray',
                  marginLeft: 20,
                  //textAlignVertical: 'center',
                }}>
                Add Gift Card
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Addgiftcard')}>
              <Text
                style={{
                  //  flex: 1,
                  fontSize: 16,
                  //sfontWeight: 'bold',
                  color: 'red',
                  marginLeft: 20,
                  textAlignVertical: 'center',
                }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
        <View
          style={{
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.8,
            marginBottom: 10,
          }}>
          <View View style={{flexDirection: 'row', marginVertical: 10}}>
            <View>
              <Image
                source={require('../assets/iconsassets/payment.png')}
                style={{
                  width: 25,
                  height: 25,
                  // tintColor: 'gray',
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  //  flex: 1,
                  fontSize: 17,
                  //sfontWeight: 'bold',
                  color: 'gray',
                  marginLeft: 10,
                  //textAlignVertical: 'center',
                }}>
                Payment Via : {details.payment_method}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Paymentmethod', {details: details})
              }>
              <Text
                style={{
                  //  flex: 1,
                  fontSize: 16,
                  //sfontWeight: 'bold',
                  color: 'red',
                  marginLeft: 20,
                  textAlignVertical: 'center',
                }}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 30, flexDirection: 'row'}}>
          {/* <BouncyCheckbox
            size={20}
            fillColor="green"
            unfillColor="#FFFFFF"
            iconStyle={{borderColor: 'green', borderRadius: 5}}
            innerIconStyle={{borderWidth: 2, borderRadius: 5}}
            textStyle={{fontFamily: 'JosefinSans-Regular'}}
            onPress={() => {
              // setselect(!select);
            }}
          />
          <Text
            style={{
              fontSize: 16,
              //fontWeight: 'bold',
              //color: 'black',
            }}>
            I agree to recieve promotional service.
          </Text> */}
        </View>
      </ScrollView>
      <View
        style={{
          //flex: 1,
          elevation: 10,
          position: 'absolute',
          bottom: 0,
          padding: 10,
          backgroundColor: 'white',
          //height: '10%',
          width: '100%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
          }}>
          <View>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 22,
                  color: 'red',
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                ₹{details?.total}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={{flexDirection: 'row', marginVertical: 10}}>
              {/* <View>
                <Text
                  style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                  View details
                </Text>
              </View> */}
            </TouchableOpacity>
          </View>
          {/* {select ? ( */}
          <TouchableOpacity
            onPress={() =>
              details.payment_method === 'COD'
                ? onPressPayment()
                : onPressNetbanking()
            }
            style={{
              //flex: 1,
              // marginVertical: 30,
              alignSelf: 'center',
              backgroundColor: select ? 'green' : 'gray',
              borderRadius: 40,
              padding: 15,
            }}
            disabled={!select}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: select ? 'yellow' : 'white',
                textAlign: 'center',
              }}>
              Make Payment
            </Text>
          </TouchableOpacity>
          {/* ) : null} */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Securecheckout;

const styles = StyleSheet.create({});
