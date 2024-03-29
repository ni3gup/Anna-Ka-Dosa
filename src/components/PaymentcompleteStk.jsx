import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Paymentcomplete = ({navigation, route}) => {
  const {details, data} = route.params;
  console.log(details, data);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* <View
        style={{backgroundColor: '#fed920', padding: 9, flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/iconsassets/left-arrow.png')}
            style={{
              width: 35,
              height: 35,
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
      </View> */}
      <View
        style={{margin: 20, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity>
          <Image
            source={require('../assets/iconsassets/payment-success.gif')}
            style={{height: 400, width: 400}}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              marginTop: -20,
              flexDirection: 'column',
              fontSize: 25,
              //fontWeight: 'bold',
              color: 'black',
              //marginLeft: 20,
              textAlign: 'center',
            }}>
            Order Confirmed
          </Text>
          <Text
            style={{
              flexDirection: 'column',
              fontSize: 30,
              //ontWeight: 'bold',
              //color: 'black',
              //marginLeft: 40,
              marginTop: 15,
              color: 'red',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            ₹{details.total}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.replace('Main')}
            style={{
              backgroundColor: 'green',
              paddingHorizontal: 32,
              paddingVertical: 20,
              alignSelf: 'center',
              borderRadius: 40,
              marginTop: 40,
              elevation: 10,
            }}>
            <Text style={{color: 'yellow', fontWeight: 'bold'}}>
              Back to Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.replace('Trackingorder')}
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingVertical: 20,
              alignSelf: 'center',
              borderRadius: 40,
              marginTop: 20,
              elevation: 10,
            }}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Track your Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Paymentcomplete;

const styles = StyleSheet.create({});
