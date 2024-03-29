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

const Orderinghelp = ({navigation}) => {
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
          Ordering Help
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{margin: 20}}>
        <TouchableOpacity>
          <Image
            source={require('../assets/iconsassets/order-help.gif')}
            style={{height: 400, width: 400, alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              marginTop: -20,
              flexDirection: 'column',
              fontSize: 25,
              fontWeight: 'bold',
              color: 'black',
              //marginLeft: 20,
              textAlign: 'center',
            }}>
            Contact Us
          </Text>
          <Text
            style={{
              flexDirection: 'column',
              fontSize: 15,
              //ontWeight: 'bold',
              //color: 'black',
              //marginLeft: 40,
              marginTop: 15,
              textAlign: 'center',
            }}>
            If you face any troublefor ordering feel free to contact us.
          </Text>
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
              onPress={() => Linking.openURL('tel:07042200132')}
              style={{
                flexDirection: 'row',
                // borderBottomColor: 'lightgray',
                //borderBottomWidth: 0.5,
                //marginVertical: 10,
                // paddingBottom: 10,
              }}>
              <Image
                source={require('../assets/iconsassets/call.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: 'red',
                }}
              />

              <Text
                style={{
                  flex: 1,
                  fontSize: 18,

                  color: 'gray',
                  marginLeft: 14,
                  textAlignVertical: 'center',
                }}>
                +91 07042200132
              </Text>
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
              onPress={() => Linking.openURL('mailto:annakadosa@gmail.com')}
              style={{
                flexDirection: 'row',
                // borderBottomColor: 'lightgray',
                //borderBottomWidth: 0.5,
                //marginVertical: 10,
                // paddingBottom: 10,
              }}>
              <Image
                source={require('../assets/iconsassets/Email.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: 'red',
                }}
              />

              <Text
                style={{
                  flex: 1,
                  fontSize: 18,

                  color: 'gray',
                  marginLeft: 14,
                  textAlignVertical: 'center',
                }}>
                annakadosa@gmail.com
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orderinghelp;

const styles = StyleSheet.create({});
