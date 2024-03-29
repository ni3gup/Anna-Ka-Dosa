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

const ManageAddress = ({navigation}) => {
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
          Manage Address
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          margin: 20,
        }}>
        <TouchableOpacity>
          <Image
            source={require('../assets/iconsassets/manage-address.gif')}
            style={{height: 400, width: 400, alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Address')}
          style={{
            backgroundColor: 'green',
            padding: 15,
            alignSelf: 'center',
            borderRadius: 40,
            marginTop: 150,
          }}>
          <Text style={{fontSize: 16, color: 'yellow', fontWeight: 'bold'}}>
            Your Address
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageAddress;

const styles = StyleSheet.create({});
