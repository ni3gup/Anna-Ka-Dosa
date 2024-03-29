import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const OrderStatus = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{backgroundColor: '#fed920', padding: 9, flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
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
          Order Status
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 20}}>
        <View
          style={{
            borderBottomWidth: 0.8,
            borderColor: 'lightgray',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: 'black',
              marginBottom: 5,
            }}>
            Order Details
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 15}}>
          <Text
            style={{
              fontSize: 15,

              color: 'black',
            }}>
            Order ID
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'gray',
              marginLeft: 57,
            }}>
            LP3057
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 15}}>
          <Text
            style={{
              fontSize: 15,

              color: 'black',
            }}>
            Order Date
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'gray',
              marginLeft: 35,
            }}>
            30 Dec,2023
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 15}}>
          <Text
            style={{
              fontSize: 15,

              color: 'black',
            }}>
            Payment Type
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'gray',
              marginLeft: 12,
            }}>
            COD
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 15}}>
          <Text
            style={{
              fontSize: 15,

              color: 'black',
            }}>
            Total Amount
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'gray',
              marginLeft: 15,
            }}>
            ₹144.25
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <View style={{alignItems: 'flex-start'}}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  borderColor: 'black',
                  borderWidth: 1,
                  //padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 20,
                    backgroundColor: 'red',
                  }}></View>
              </View>
              <View
                style={{
                  height: 80,
                  width: 2,
                  backgroundColor: 'red',
                }}></View>
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  borderColor: 'black',
                  borderWidth: 1,
                  //padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 20,
                    backgroundColor: 'red',
                  }}></View>
              </View>
              <View
                style={{
                  height: 40,
                  width: 2,
                  backgroundColor: 'red',
                }}></View>
              <View
                style={{
                  height: 40,
                  width: 2,
                  backgroundColor: 'gray',
                }}></View>
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  borderColor: 'black',
                  borderWidth: 1,
                  //padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 20,
                    // backgroundColor: 'red',
                  }}></View>
              </View>
            </View>
          </View>
          <View>
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 17, color: 'black', fontWeight: 'bold'}}>
                Order Recieved
              </Text>
              <Text style={{color: 'black', marginTop: 5}}>
                06:00 PM, Dec 30, 2023
              </Text>
            </View>
            <View
              style={{
                marginLeft: 10,
                marginTop: 65,
                flexDirection: 'row',
              }}>
              <View style={{}}>
                <Text
                  style={{fontSize: 17, color: 'black', fontWeight: 'bold'}}>
                  On The Way
                </Text>
                <Text style={{color: 'black', marginTop: 5}}>
                  06:20 PM, Dec 30, 2023
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Trackingorder')}
                style={{
                  marginLeft: 30,
                  backgroundColor: 'red',
                  alignSelf: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  Track order
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginLeft: 10,
                marginTop: 60,
              }}>
              <Text style={{fontSize: 17, color: 'black', fontWeight: 'bold'}}>
                Delivered
              </Text>
              <Text style={{color: 'black', marginTop: 5}}>
                Approx time 6:45
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Rateorder')}
          style={{
            marginTop: 50,
            alignSelf: 'center',
            backgroundColor: 'green',
            borderRadius: 40,
            padding: 15,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'yellow',
            }}>
            Confirm Delivery
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({});
