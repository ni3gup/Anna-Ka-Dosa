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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../loadingcomponent/loading';
import { useFocusEffect } from '@react-navigation/native';
import { getData, storeData } from '../utils/AsyncStorag';
import Snackbar from 'react-native-snackbar';

const Address = ({ navigation, route }) => {
  const colorScheme = useColorScheme();
  const { cart } = route?.params;
  useFocusEffect(
    React.useCallback(() => {
      // Call fetchData function when the screen is focused
      fetchData();
    }, []), // Empty dependency array to run only when the screen is focused
  );

  const fetchData = async () => {
    setload(true);

    await getareadetails()

    const id = await getData('id');
    const storedAddressId = await getData('addressid');
    //console.log('addressid', storedAddressId);
    try {
      const requestBody = {
        user_id: id,
      };

      const response = await axios.post(
        'https://newannakadosa.com/api/user/address/',
        requestBody,
      );

      //console.log('address', response.data.data);

      // Check if response data array is empty
      if (response.data.data.length === 0) {
        Snackbar.show({
          text: 'Please add your Address',
          textColor: 'black',
          backgroundColor: 'orange',
          duration: Snackbar.LENGTH_LONG,
          marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
        });
        //console.error('API error:', response.data.message);
        setload(false);
        return; // Exit the function if the array is empty
      }

      // Update state with the fetched data
      setAddresses(response.data.data);
      if (!!storedAddressId) {
        setaddid(storedAddressId);
      }
      setload(false);
    } catch (error) {
      console.error('API error:', error);
      setload(false);
    }
  };

  const getareadetails = async () => {
    try {
      const response = await axios.get(
        'https://newannakadosa.com/api/delivered/area',
      );
      setareaData(response.data.data);
      // console.log('area', response.data.data)
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const [addid, setaddid] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [areas, setareaData] = useState([]);
  const [load, setload] = useState(false);

  // const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
  if (!load) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{
            backgroundColor: '#fed920',
            padding: 9,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() =>
              cart ? navigation.navigate('Menu') : navigation.goBack()
            }>
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
            marginHorizontal: 20,
          }}>
          {addresses?.map((address, index) => {
            let area = areas.filter(area => area.id === address.delivery_area_id)

            area = area.length ? area[0].area_name : ""

            return (
              <TouchableOpacity
                key={address.id}
                onPress={async () => {
                  await storeData(
                    'address',
                    address?.address.concat(' ', ',', ' ', address?.landmark, ' ', ',', ' ', area),
                  );
                  await storeData('addressid', address?.id.toString());

                  Snackbar.show({
                    text: 'Address selected Successfully',
                    textColor: 'white',
                    backgroundColor: 'green',
                    duration: Snackbar.LENGTH_SHORT,
                    marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
                  });
                  fetchData();
                  //  setSelectedAddressIndex(index);
                }}
                style={{
                  padding: 15,
                  borderWidth:
                    addid !== '' && addid == address.id.toString() ? 1 : 0.8,
                  borderColor:
                    addid !== '' && addid == address.id.toString()
                      ? 'green'
                      : 'lightgray',
                  marginTop: 20,
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Image
                      source={require('../assets/iconsassets/location.png')}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: 'gray',
                        //marginLeft: ,
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: 20,
                        color: colorScheme === 'dark' ? 'gray' : 'gray',
                      }}>
                      {address?.type}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.replace('Addaddress', {
                        editable: true,
                        editaddress: address,
                      });
                      //console.log('address', address);
                    }}>
                    <Image
                      source={require('../assets/iconsassets/edit.png')}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: 'gray',
                        //marginLeft: ,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 15, color: 'black', marginVertical: 10 }}>
                    {address.address} , {address.landmark}, {area}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}

          <TouchableOpacity
            onPress={() => navigation.replace('Addaddress', { editable: false })}
            style={{
              backgroundColor: 'green',
              padding: 15,
              alignSelf: 'center',
              borderRadius: 40,
              marginTop: 250,
            }}>
            <Text style={{ fontSize: 16, color: 'yellow', fontWeight: 'bold' }}>
              Add Address
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return <Loading />;
  }
};

export default Address;

const styles = StyleSheet.create({});
