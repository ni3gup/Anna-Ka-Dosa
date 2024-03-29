import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Trackingorder = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{backgroundColor: '#fed920', padding: 9, flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Orderstatus')}>
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
          Track Current Order
        </Text>
      </View>
      <ImageBackground
        source={require('../assets/iconsassets/Tracker.png')}
        style={{position: 'relative', width: '100%', height: '100%'}}
      />

      <View
        style={{
          //flex: 1,
          margin: 20,
          position: 'absolute',
          bottom: 0,

          backgroundColor: 'white',
          height: '30%',
          width: '95%',
          alignSelf: 'center',
          borderRadius: 40,
        }}>
        <View style={{alignSelf: 'center'}}>
          <Image
            source={require('../assets/iconsassets/track-order.gif')}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
            Arrived in 10:48 min
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', marginHorizontal: 10, marginTop: 25}}>
          <View>
            <Image
              source={require('../assets/iconsassets/user.png')}
              style={{
                width: 50,
                height: 50,
              }}
            />
          </View>
          <View style={{flex: 1, marginLeft: 5, marginTop: 10}}>
            <Text style={{textAlign: 'center', color: 'gray'}}>
              Tom Hedge is on the way to deliver your order
            </Text>
          </View>

          <TouchableOpacity
            style={{
              borderRadius: 10,
              borderColor: 'lightgray',
              borderWidth: 1,
              alignSelf: 'center',
              padding: 10,
            }}>
            <Image
              source={require('../assets/iconsassets/call.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: 'red',

                // marginRight: 25,
                // marginTop: 5,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Trackingorder;

const styles = StyleSheet.create({});
