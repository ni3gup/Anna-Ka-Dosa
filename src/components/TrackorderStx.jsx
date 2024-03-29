import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';

const Trackorder = ({navigation}) => {
  const colorScheme = useColorScheme();
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
          Track Current Order
        </Text>
      </View>
      <View style={{margin: 20}}>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 30,
            }}>
            Enter Mobile Number
          </Text>
          <TextInput
            style={{
              fontSize: 18,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              color: colorScheme === 'dark' ? 'black' : 'black',
            }}
            placeholder="+91 1234567890"
            placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'gray'}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 30,
            }}>
            Order ID
          </Text>
          <TextInput
            style={{
              fontSize: 18,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              color: colorScheme === 'dark' ? 'black' : 'black',
            }}
            placeholder="LP3057"
            placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'gray'}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Trackingorder')}
          style={{
            marginTop: 40,
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
            Track My Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Trackorder;

const styles = StyleSheet.create({});
