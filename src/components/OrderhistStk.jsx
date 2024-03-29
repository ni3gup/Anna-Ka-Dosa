import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Loading from '../loadingcomponent/loading';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {getData} from '../utils/AsyncStorag';
import Snackbar from 'react-native-snackbar';
import RazorpayCheckout from 'react-native-razorpay';
const Orderhistory = ({navigation}) => {
  const [historyData, setHistoryData] = useState();
  const [load, setLoad] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      fetchhistory();
    }, []),
  );
  const colorScheme = useColorScheme();
  const fetchhistory = async () => {
    try {
      const id = await getData('id');
      setLoad(true);
      const body = {user_id: id};
      const response = await axios.post(
        'https://newannakadosa.com/api/order/status',
        body,
      );

      if (response?.data?.data?.length === 0) {
        setLoad(false);
        Snackbar.show({
          text: 'No Orders,Please order something !!',
          duration: Snackbar.LENGTH_LONG,
          textColor: 'white',
          backgroundColor: 'orange',
          marginBottom: 70,
          action: {
            text: 'Press',
            textColor: 'white',

            onPress: () => {
              navigation.replace('Main');
            },
          },
        });

        return;
      }
      console.log(response.data.data);
      setHistoryData(response.data.data);
    } catch (error) {
      console.error('Error fetching order history:', error);
      Snackbar.show({
        text: 'Failed to fetch order history!! ',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      });
    } finally {
      setLoad(false);
    }
  };
  // useEffect(() => {
  //   fetchhistory();
  // }, []);
  const handlecancelbtn = async order_id => {
    try {
      setLoad(true);
      const id = await getData('id');
      const body = {user_id: id, order_id: order_id};
      const response = await axios.post(
        'https://newannakadosa.com/api/order/declined/',
        body,
      );
      if (response.data.status_code === '200') {
        Snackbar.show({
          text: 'Product Cancelled Successfully!! ',
          textColor: 'white',
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
          marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
        });
        fetchhistory();
      }
    } catch (error) {
      console.error('Error fetching order history:', error);
      Snackbar.show({
        text: 'Failed to cancel order!! ',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      });
    } finally {
      setLoad(false);
    }
  };
  const onPressNetbanking = (orderid, total) => {
    var options = {
      description: 'Anna ka dosa payment page',
      //image: 'https://i.imgur.com/3g7nmJC.png',
      //image: require('../assets/iconsassets/Annac.png'),
      currency: 'INR',
      key: 'rzp_test_V7oWtsogFZS70b', // Your API key from Razorpay
      // amount: details.total * 100,
      name: 'New Anna Ka Dosa',
      order_id: orderid,
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
        handleNetbanking(data, total);

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
        handlefailedcase(orderid);

        //Alert.alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  const handlefailedcase = async orderid => {
    // console.log('details', details);
    setLoad(true);
    try {
      const id = await getData('id');

      const response1 = await axios.post(
        'https://newannakadosa.com/api/payment/status',
        {
          user_id: id,
          status: 'failed',
          razorpay_order_id: orderid,
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
  const handleNetbanking = async (razdata, total) => {
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
      let details = {total: total};
      const body = {
        user_id: id,
        razorpay_order_id: razdata.razorpay_order_id,
        razorpay_payment_id: razdata.razorpay_payment_id,
        razorpay_signature: razdata.razorpay_signature,
        status: 'success',
      };
      console.log('body', body);
      const response2 = await axios.post(
        'https://newannakadosa.com/api/payment/status',
        body,
      );
      console.log(response2);
      navigation.replace('Paymentcomplete', {details: details});
    } catch (error) {
      console.error('Error:', error);
      // Handle errors appropriately
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
          Order History
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 20,
        }}>
        {
          // ?.filter(product => product?.order_status !== 0)
          historyData?.map((item, index) => (
            <View
              key={index}
              style={{
                borderBottomColor: 'lightgray',
                borderBottomWidth: 0.8,
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  // marginBottom: 10,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    Order Details
                  </Text>
                </View>
                {item?.order_status === 2 && (
                  <View
                    style={{
                      backgroundColor: 'skyblue',
                      alignSelf: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: 'center',
                        color: 'white',
                      }}>
                      Delivered
                    </Text>
                  </View>
                )}
                {item?.order_status === 0 && (
                  <View
                    style={{
                      backgroundColor: 'orange',
                      alignSelf: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: 'center',
                        color: 'white',
                      }}>
                      Pending
                    </Text>
                  </View>
                )}
                {item?.order_status === 1 && (
                  <View
                    style={{
                      backgroundColor: 'green',
                      alignSelf: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: 'center',
                        color: 'white',
                      }}>
                      Progress
                    </Text>
                  </View>
                )}

                {item?.order_status === 4 && (
                  <View
                    style={{
                      backgroundColor: 'lightgray',
                      alignSelf: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: 'center',
                        color: 'black',
                      }}>
                      Cancelled
                    </Text>
                  </View>
                )}
                {item?.order_status === 3 && (
                  <View
                    style={{
                      backgroundColor: 'gray',
                      alignSelf: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: 'center',
                        color: 'black',
                      }}>
                      Completed
                    </Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  flex: 1,
                  //alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    //sfontWeight: 'bold',
                    color: 'black',
                    // marginLeft: 20,
                    // textAlignVertical: 'center',
                  }}>
                  #Order: {item?.order_id}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 17,
                  flex: 1,
                  //sfontWeight: 'bold',
                  color: 'black',
                  // marginLeft: 20,
                  // textAlignVertical: 'center',
                }}>
                #Transaction:{' '}
                {item.transection_id == null ? 'pending' : item.transection_id}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  //sfontWeight: 'bold',
                  color: 'black',
                  marginLeft: 2,
                  // textAlignVertical: 'center',
                }}>
                Payment Method: {item?.payment_method}
              </Text>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    //textAlign: 'center',
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  Order List
                </Text>

                {item?.order_products?.map((product, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      marginVertical: 5,
                      //width: '80%',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        width: '50%',
                      }}>
                      <Text
                        style={{
                          alignSelf: 'flex-start',
                          textAlign: 'left',
                          color: colorScheme === 'dark' ? 'gray' : 'gray',
                        }}>
                        {product?.product_name}
                      </Text>
                      <Text
                        style={{
                          alignSelf: 'flex-start',
                          textAlign: 'left',
                          color: colorScheme === 'dark' ? 'gray' : 'gray',
                        }}>
                        x {product?.qty}
                      </Text>
                    </View>
                    <Text
                      style={{color: colorScheme === 'dark' ? 'gray' : 'gray'}}>
                      Price/Unit ₹{product?.unit_price}
                    </Text>
                  </View>
                ))}
                {item?.instruction && (
                  <View style={{flex: 1}}>
                    <Text
                      style={{color: colorScheme === 'dark' ? 'gray' : 'gray'}}>
                      Instructions : {item?.instruction}
                    </Text>
                  </View>
                )}
                <View style={{marginTop: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',

                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: colorScheme === 'dark' ? 'gray' : 'gray',
                        //textAlign: 'center',
                        //color: 'white',
                        fontWeight: 'bold',
                      }}>
                      Subtotal
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        //textAlign: 'center',
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      ₹{item?.sub_total}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',

                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        //textAlign: 'center',
                        color: colorScheme === 'dark' ? 'gray' : 'gray',
                        //color: 'white',
                        fontWeight: 'bold',
                      }}>
                      Delivery Charge
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        //textAlign: 'center',
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      + ₹{item?.delivery_charge}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',

                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        //textAlign: 'center',
                        //color: 'white',
                        color: colorScheme === 'dark' ? 'gray' : 'gray',
                        fontWeight: 'bold',
                      }}>
                      Coupon Discount
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        //textAlign: 'center',
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      - ₹{item?.coupon_price}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',

                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        //textAlign: 'center',
                        //color: 'white',
                        color: colorScheme === 'dark' ? 'gray' : 'gray',
                        fontWeight: 'bold',
                      }}>
                      gst(5%)
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        //textAlign: 'center',
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      + ₹{item?.gst}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        //textAlign: 'center',
                        //color: 'white',
                        color: colorScheme === 'dark' ? 'gray' : 'gray',
                        fontWeight: 'bold',
                      }}>
                      Grand Total
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        //textAlign: 'center',
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      ₹{item?.grand_total}
                    </Text>
                  </View>
                  <View style={{marginVertical: 10}}>
                    <Text
                      style={{color: colorScheme === 'dark' ? 'gray' : 'gray'}}>
                      Ordered on:
                      {new Date(item?.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      gap: 10,
                    }}>
                    {item?.order_status === 2 && (
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Rateorder')}
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 10,
                          borderRadius: 20,
                          borderWidth: 2,
                          borderColor: 'green',
                          backgroundColor: 'green',
                          alignSelf: 'center',
                        }}>
                        <Text style={{textAlign: 'center', color: 'white'}}>
                          Rate order
                        </Text>
                      </TouchableOpacity>
                    )}
                    {item?.payment_status === 0 &&
                      item?.payment_method == 'Online' &&
                      item?.order_status !== 4 && (
                        <TouchableOpacity
                          onPress={() =>
                            onPressNetbanking(item?.order_id, item?.grand_total)
                          }
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 20,
                            borderWidth: 2,
                            borderColor: 'green',
                            backgroundColor: 'green',
                            alignSelf: 'center',
                            marginVertical: 15,
                          }}>
                          <Text style={{textAlign: 'center', color: 'white'}}>
                            Pay Again
                          </Text>
                        </TouchableOpacity>
                      )}
                    {item?.order_status === 1 ? (
                      <TouchableOpacity
                        onPress={() => handlecancelbtn(item?.order_id)}
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          borderRadius: 20,
                          borderWidth: 2,
                          borderColor: 'red',
                          backgroundColor: 'red',
                          alignSelf: 'center',
                          marginVertical: 15,
                        }}>
                        <Text style={{textAlign: 'center', color: 'white'}}>
                          Cancel Order
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orderhistory;

const styles = StyleSheet.create({});
