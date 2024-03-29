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

const Settings = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{backgroundColor: '#fed920', padding: 9, flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
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
          Settings
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 20}}>
        <View
          style={{
            // margin: 5,
            // elevation: 5,
            // shadowColor: 'red', // Shadow color (Android)
            // shadowOffset: {width: 4, height: 2}, // Shadow offset (Android)
            // shadowOpacity: 0.1, // Shadow opacity (Android)
            // shadowRadius: 20,
            // shadowRadius: 20,
            marginTop: 20,
            borderRadius: 20,
            borderWidth: 0.3,
            borderColor: 'gray',
            padding: 15,
          }}>
          <Text
            style={{
              flex: 1,
              fontSize: 18,

              color: 'red',
              marginVertical: 10,
              textAlignVertical: 'center',
            }}>
            Food Orders
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderHistory')}
            style={{
              flexDirection: 'row',
              borderBottomColor: 'lightgray',
              borderBottomWidth: 0.5,
              marginVertical: 10,
              paddingBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('OrderHistory')}>
              <Image
                source={require('../assets/iconsassets/Menu-screen.png')}
                style={{
                  width: 33,
                  height: 33,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                fontSize: 18,

                color: 'black',
                marginLeft: 14,
                textAlignVertical: 'center',
              }}>
              Order History
            </Text>
            <TouchableOpacity
              style={{borderRadius: 40, overflow: 'hidden'}}
              onPress={() => navigation.navigate('OrderHistory')}>
              <Image
                source={require('../assets/iconsassets/arrowr.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: 'red',
                  marginTop: 10,
                }}
                //  resizeMode="cover"
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Address', {cart: false})}
            style={{
              flexDirection: 'row',
              borderBottomColor: 'lightgray',
              borderBottomWidth: 0.5,
              marginVertical: 10,
              paddingBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Address', {cart: false})}>
              <Image
                source={require('../assets/iconsassets/location.png')}
                style={{
                  width: 33,
                  height: 33,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                fontSize: 18,

                color: 'black',
                marginLeft: 14,
                textAlignVertical: 'center',
              }}>
              Manage Address
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Address', {cart: false})}
              style={{borderRadius: 40, overflow: 'hidden'}}
              //</View>onPress={() => navigation.navigate('SignIn')}
            >
              <Image
                source={require('../assets/iconsassets/arrowr.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: 'red',
                  marginTop: 10,
                }}
                //  resizeMode="cover"
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Trackorder')}
            style={{
              flexDirection: 'row',
              borderBottomColor: 'lightgray',
              //borderBottomWidth: 0.5,
              //marginVertical: 10,
              //paddingBottom: 10,
              marginTop: 10,
              marginBottom: 5,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Trackorder')}>
              <Image
                source={require('../assets/iconsassets/Track.png')}
                style={{
                  width: 33,
                  height: 33,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                fontSize: 18,

                color: 'black',
                marginLeft: 14,
                textAlignVertical: 'center',
              }}>
              Track Order
            </Text>
            <TouchableOpacity
              style={{borderRadius: 40, overflow: 'hidden'}}
              onPress={() => navigation.navigate('Trackorder')}>
              <Image
                source={require('../assets/iconsassets/arrowr.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: 'red',
                  marginTop: 10,
                }}
                //  resizeMode="cover"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 20,
            // elevation: 5, // Add elevation for Android shadow
            // shadowColor: 'gray', // Shadow color (iOS)
            // shadowOffset: {width: 0, height: 2}, // Shadow offset (iOS)
            // shadowOpacity: 0.2, // Shadow opacity (iOS)
            // shadowRadius: 3, // Shadow radius (iOS)
            borderRadius: 20,
            borderWidth: 0.3,
            borderColor: 'gray',
            padding: 15,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Feedback')}
            style={{
              flexDirection: 'row',
              // borderBottomColor: 'lightgray',
              //borderBottomWidth: 0.5,
              //marginVertical: 10,
              // paddingBottom: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
              <Image
                source={require('../assets/iconsassets/send-feedback.png')}
                style={{
                  width: 33,
                  height: 33,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                fontSize: 18,

                color: 'black',
                marginLeft: 14,
                textAlignVertical: 'center',
              }}>
              Send Feedback
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Feedback')}
              style={{borderRadius: 40, overflow: 'hidden'}}
              //</View>onPress={() => navigation.navigate('SignIn')}
            >
              <Image
                source={require('../assets/iconsassets/arrowr.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: 'red',
                  marginTop: 7,
                }}
                //  resizeMode="cover"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginVertical: 20,

            borderRadius: 20,
            borderWidth: 0.3,
            borderColor: 'gray',
            padding: 15,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Aboutus')}
            style={{
              flexDirection: 'row',
              borderBottomColor: 'lightgray',
              //borderBottomWidth: 0.5,
              // marginVertical: 5,
              // paddingBottom: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Aboutus')}>
              <Image
                source={require('../assets/iconsassets/About-Us.png')}
                style={{
                  width: 33,
                  height: 33,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                fontSize: 18,

                color: 'black',
                marginLeft: 14,
                textAlignVertical: 'center',
              }}>
              About Us
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Aboutus')}
              style={{borderRadius: 40, overflow: 'hidden'}}
              //</View>onPress={() => navigation.navigate('SignIn')}
            >
              <Image
                source={require('../assets/iconsassets/arrowr.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: 'red',
                  marginTop: 7,
                }}
                //  resizeMode="cover"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View
          style={{
            //marginVertical: 20,

            borderRadius: 20,
            borderWidth: 0.3,
            borderColor: 'gray',
            padding: 15,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Orderinghelp')}
            style={{
              flexDirection: 'row',
              borderBottomColor: 'lightgray',
              //borderBottomWidth: 0.5,
              // marginVertical: 5,
              // paddingBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Orderinghelp')}>
              <Image
                source={require('../assets/iconsassets/ordering-help.png')}
                style={{
                  width: 33,
                  height: 33,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                fontSize: 18,

                color: 'black',
                marginLeft: 14,
                textAlignVertical: 'center',
              }}>
              Ordering Help
            </Text>
            <TouchableOpacity
              style={{borderRadius: 40, overflow: 'hidden'}}
              onPress={() => navigation.navigate('Orderinghelp')}>
              <Image
                source={require('../assets/iconsassets/arrowr.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: 'red',
                  marginTop: 7,
                }}
                //  resizeMode="cover"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginVertical: 20,

            borderRadius: 20,
            borderWidth: 0.3,
            borderColor: 'gray',
            padding: 15,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Faqs')}
            style={{
              flexDirection: 'row',
              borderBottomColor: 'lightgray',
              //borderBottomWidth: 0.5,
              // marginVertical: 5,
              // paddingBottom: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Faqs')}>
              <Image
                source={require('../assets/iconsassets/FAQs.png')}
                style={{
                  width: 33,
                  height: 33,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                fontSize: 18,

                color: 'black',
                marginLeft: 14,
                textAlignVertical: 'center',
              }}>
              FAQs
            </Text>
            <TouchableOpacity
              style={{borderRadius: 40, overflow: 'hidden'}}
              onPress={() => navigation.navigate('Faqs')}>
              <Image
                source={require('../assets/iconsassets/arrowr.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: 'red',
                  marginTop: 7,
                }}
                //  resizeMode="cover"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            //    marginVertical: 10,

            borderRadius: 20,
            borderWidth: 0.3,
            borderColor: 'gray',
            padding: 15,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Rateus')}
            style={{
              flexDirection: 'row',
              borderBottomColor: 'lightgray',
              //borderBottomWidth: 0.5,
              // marginVertical: 5,
              // paddingBottom: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Rateus')}>
              <Image
                source={require('../assets/iconsassets/Rateus.png')}
                style={{
                  width: 33,
                  height: 33,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                fontSize: 18,

                color: 'black',
                marginLeft: 14,
                textAlignVertical: 'center',
              }}>
              Rate Us
            </Text>
            <TouchableOpacity
              style={{borderRadius: 40, overflow: 'hidden'}}
              onPress={() => navigation.navigate('Rateus')}>
              <Image
                source={require('../assets/iconsassets/arrowr.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: 'red',
                  marginTop: 7,
                }}
                //  resizeMode="cover"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            marginVertical: 20,
            //marginTop: 20,
            borderRadius: 20,
            borderWidth: 0.3,
            borderColor: 'gray',
            padding: 15,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Logout')}
            style={{
              flexDirection: 'row',
              borderBottomColor: 'lightgray',
              //borderBottomWidth: 0.5,
              // marginVertical: 5,
              // paddingBottom: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Logout')}>
              <Image
                source={require('../assets/iconsassets/logoutt.png')}
                style={{
                  width: 33,
                  height: 33,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                fontSize: 18,

                color: 'black',
                marginLeft: 14,
                textAlignVertical: 'center',
              }}>
              Log Out
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Logout')}
              style={{borderRadius: 40, overflow: 'hidden'}}
              //</View>onPress={() => navigation.navigate('SignIn')}
            >
              <Image
                source={require('../assets/iconsassets/arrowr.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: 'red',
                  marginTop: 7,
                }}
                //  resizeMode="cover"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
