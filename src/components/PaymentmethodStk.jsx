import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {getData} from '../utils/AsyncStorag';
import axios from 'axios';
import Loading from '../loadingcomponent/loading';
import Snackbar from 'react-native-snackbar';
import RazorpayCheckout from 'react-native-razorpay';
const Paymentmethod = ({navigation, route}) => {
  const [select, setselect] = useState(false);
  const {details} = route.params;
  const [load, setLoad] = useState(false);
  console.log(details);
  const [responsedata, setresponsedata] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  useEffect(() => {
    if (selectedOption !== '') {
      // State has been updated, perform any actions here
      details.payment_method = selectedOption;
      console.log(details);
      setselect(true); // You might want to check if this is needed
    }
  }, [selectedOption, details]);

  const handleRadioPress = option => {
    setSelectedOption(option);
  };

  const renderRadioButton = (option, label) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          alignItems: 'center',
        }}
        onPress={() => handleRadioPress(option)}>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          {selectedOption === option && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: 'green',
              }}
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            marginVertical: 5,
            borderRadius: 20,
            borderWidth: selectedOption === option ? 1 : 0.3,
            borderColor: selectedOption === option ? 'green' : 'gray',
            padding: 15,
          }}>
          <View
            //onPress={handleTouchableOpacityPress}
            style={{
              borderBottomColor: 'lightgray',
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 18,
                color: 'black',
                marginLeft: 14,
                textAlignVertical: 'center',
                fontWeight: selectedOption === option ? 'bold' : 'normal',
              }}>
              {label}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const onPressPayment = async () => {
    // console.log('details', details);
    setLoad(true);
    try {
      const id = await getData('id');
      const addressid = await getData('addressid');
      // const response2 = await axios.post(
      //   'https://techiedom.com/annakadosa/api/cod',
      //   {user_id: id, order_id: details.order_id, address_id: addressid},
      // );
      // console.log('Response 2:', response2.data);

      const response1 = await axios.post(
        'https://newannakadosa.com/api/destroy/cart/',
        {user_id: id},
      );
      console.log('Response 1:', response1.data);
      // Handle the responses or perform additional actions as needed
      navigation.replace('Paymentcomplete', {details: details});
    } catch (error) {
      console.error('Error:', error);
      // Handle errors appropriately
    } finally {
      setLoad(false);
    }
  };
  const handlecreateOrder = async () => {
    setLoad(true);
    try {
      const apiUrl = 'https://newannakadosa.com/api/order/create';

      const body = {
        user_id: details?.user_id,
        instruction: details?.instruction,
        coupon_code: details?.coupon_code,
        address_id: details?.address_id,
        payment_method: selectedOption,
      };
      console.log('body', body);
      const response = await axios.post(apiUrl, body);
      console.log(
        'ordercreate response',
        response?.data?.data?.razorpay_order_id,
        response.data.data,
      );

      if (selectedOption == 'ONLINE') {
        details.online_order_id = response?.data?.data?.razorpay_order_id;
        console.log('details in payment method', details);
        onPressNetbanking();
        //navigation.replace('Securecheckout', {details: details});
      }
      if (selectedOption == 'COD') {
        details.online_order_id = response?.data?.data?.order_id;
        onPressPayment();
      }
    } catch (error) {
      Snackbar.show({
        text: 'Failed To Move to checkout ',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      });
      navigation.replace('Main');
      console.error('Error updating quantity:', error);
    } finally {
      setLoad(false);
    }
  };
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
      const response2 = await axios.post(
        'https://newannakadosa.com/api/destroy/cart/',
        {user_id: id},
      );
      console.log('Response 2:', response2.data);
      navigation.replace('OrderHistory');
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
      // amount: details.total * 100,
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
          text: 'Payment Cancelled. Please try again',
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
          Select Payment Method
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{margin: 0}}>
        <View
          style={{
            borderBottomWidth: 0.8,
            borderColor: 'lightgray',
            marginHorizontal: 20,
            marginVertical: 20,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            Select Payment Mode
          </Text>
        </View>

        {renderRadioButton('COD', 'Cash on Delivery')}
        {renderRadioButton('ONLINE', 'Pay Online')}
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
                ₹{details.total}
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
          {/* {selectbox ? ( */}
          <TouchableOpacity
            disabled={!select}
            onPress={() => {
              // console.log('details', details);
              // navigation.replace('Securecheckout', {details: details});
              handlecreateOrder();
            }}
            style={{
              // flex: 1,
              // marginVertical: 30,
              alignSelf: 'center',
              backgroundColor: select ? 'green' : 'lightgray',
              borderRadius: 40,
              padding: 20,
              paddingVertical: 15,
            }}
            //</View>disabled={!selectbox}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: select ? 'yellow' : 'white',
                //textAlign: 'center',
              }}>
              Confirm Order
            </Text>
          </TouchableOpacity>
          {/* ) : null} */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Paymentmethod;

const styles = StyleSheet.create({});
