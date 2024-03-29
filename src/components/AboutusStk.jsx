import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Aboutus = ({navigation}) => {
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
          About Us
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{margin: 20}}>
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
            onPress={() => navigation.navigate('About')}
            style={{
              flexDirection: 'row',
              // borderBottomColor: 'lightgray',
              //borderBottomWidth: 0.5,
              //marginVertical: 10,
              // paddingBottom: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('About')}>
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
              About
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('About')}
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
            onPress={() => navigation.navigate('Terms')}
            style={{
              flexDirection: 'row',
              // borderBottomColor: 'lightgray',
              //borderBottomWidth: 0.5,
              //marginVertical: 10,
              // paddingBottom: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
              <Image
                source={require('../assets/iconsassets/terms.png')}
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
              Terms & Conditions
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Terms')}
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
            onPress={() => navigation.navigate('Privacypolicy')}
            style={{
              flexDirection: 'row',
              // borderBottomColor: 'lightgray',
              //borderBottomWidth: 0.5,
              //marginVertical: 10,
              // paddingBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Privacypolicy')}>
              <Image
                source={require('../assets/iconsassets/privacy-policy.png')}
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
              Privacy Policy
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Privacypolicy')}
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
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
            gap: 10,
          }}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.facebook.com/p/Anna-Ka-Dosa-100054437383305/',
              )
            }
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
              justifyContent: 'center',
              alignItems: 'center',
              height: 150,
              width: 150,
              //paddingVertical: 50,
            }}>
            <Image
              source={require('../assets/iconsassets/facebook-icon.png')}
              style={{
                alignSelf: 'center',
                width: 40,
                height: 40,
              }}
            />
            <View
              style={
                {
                  // alignSelf: 'center',
                }
              }>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginVertical: 10,
                  color: 'black',
                }}>
                Follow us on Facebook
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.instagram.com/explore/locations/1621688231424912/anna-ka-dosa-corner-at-kalkaji/',
              )
            }
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
              justifyContent: 'center',
              alignItems: 'center',
              height: 150,
              width: 150,
            }}>
            <Image
              source={require('../assets/iconsassets/instagram-icon.png')}
              style={{
                alignSelf: 'center',
                width: 40,
                height: 40,
              }}
            />
            <View
              style={
                {
                  // alignSelf: 'center',
                }
              }>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginVertical: 10,
                  color: 'black',
                }}>
                Follow us on Instagram
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Aboutus;

const styles = StyleSheet.create({});
