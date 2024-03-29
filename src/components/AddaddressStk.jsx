import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import Loading from '../loadingcomponent/loading';
import {getData, storeData} from '../utils/AsyncStorag';
import Snackbar from 'react-native-snackbar';

const Addaddress = ({navigation, route}) => {
  const colorScheme = useColorScheme();
  const [value, setValue] = useState(null);
  const {editable, editaddress} = route?.params;
  const [load, setload] = useState(false);
  const [deliveryid, setdeliveryid] = useState(null);
  useEffect(() => {
    const setDeliveryId = async () => {
      if (editable) {
        setdeliveryid(editaddress?.delivery_area_id);
      }
    };
    setDeliveryId();
  }, [editable, editaddress?.delivery_area_id]);
  const initialState = editaddress
    ? {
        selectedOption: editaddress.type === 'home' ? 'home' : 'office',
        selectedtype: editaddress.type,
        address: editaddress.address,
        landmark: editaddress.landmark,
         deliveryid: editaddress.delivery_area_id,
      }
    : {
        selectedOption: null,
        selectedtype: '',
        address: '',
        landmark: '',
         deliveryid: null,
      };

  const [selectedId, setSelectedId] = useState(initialState.selectedId);
  const [selectedtype, setSelectedtype] = useState(initialState.selectedtype);
  const [address, setAddress] = useState(initialState.address);
  const [deliveryArea, setDeliveryArea] = useState(null);
  const [landmark, setLandmark] = useState(initialState.landmark);
  const [area, setareaData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(
    initialState.selectedOption,
  );
  console.log('deliveryid', deliveryid);
  useEffect(() => {
    getareadetails();
  }, []);
  const getareadetails = async () => {
    setload(true);
    try {
      const id = await getData('id');
      const response = await axios.get(
        'https://newannakadosa.com/api/delivered/area',
      );
      setload(false);
      // console.log('area', response.data.data);
      setareaData(response.data.data);
      // Snackbar.show({
      //   text: 'Address added  Successfully',
      //   textColor: 'white',
      //   backgroundColor: 'green',
      //   duration: Snackbar.LENGTH_SHORT,
      //   marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      // });
      // navigation.replace('Address');
    } catch (error) {
      setload(false);
      // Snackbar.show({
      //   text: 'Error in adding Address',
      //   textColor: 'white',
      //   backgroundColor: 'red',
      //   duration: Snackbar.LENGTH_SHORT,
      //   marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      // });
      // navigation.replace('Address');
      console.error('Error adding address:', error);
    }
  };

  const handleaddressadd = async () => {
    //console.log('address', address, selectedtype, landmark);
    setload(true);
    try {
      if (deliveryid == null || !address || !landmark || !selectedOption) {
        Alert.alert('Please fill all the fields ');
        setload(false);
        return;
      }
      const id = await getData('id');
      const response = await axios.post(
        'https://newannakadosa.com/api/add/address',
        {
          user_id: id,
          delivery_area_id: deliveryid,

          address: address,
          address_type: selectedOption,
          landmark: landmark,
        },
      );
      setload(false);
      console.log('address added', response.data);

      Snackbar.show({
        text: 'Address added  Successfully',
        textColor: 'white',
        backgroundColor: 'green',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      });
      await storeData(
        'address',
        response?.data?.data?.address + ' , ' + response?.data?.data?.landmark + " , " + deliveryArea,
        // response?.data?.data?.address.concat(
        //   ' ',
        //   ',',
        //   ' ',
        //   response?.data?.data?.landmark,
        // ),
      );
      await storeData('addressid', response?.data.data.id.toString());
      navigation.replace('Address', {cart: false});
    } catch (error) {
      setload(false);
      Snackbar.show({
        text: 'Error in adding Address',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      });
      navigation.replace('Address');
      console.error('Error adding address:', error);
    }
  };
  const handleeditaddress = async () => {
    setload(true);
    const id = await getData('id');
    try {
      const addressData = {
        user_id: id,
        address_id: editaddress.id,
        delivery_area_id: deliveryid, // Ensure it's a string
        first_name: 'null', // Modify this according to your requirements
        last_name: 'null', // Modify this according to your requirements
        address: address,
        address_type: selectedOption,
        landmark: landmark,
      };
      console.log('addressdata', addressData);
      const response = await axios.post(
        'https://newannakadosa.com/api/update/address',
        addressData,
      );

      setload(false);
      console.log('address of edit ', response.data);
      await storeData(
        'address',
        response?.data?.data?.address + ' , ' + response?.data?.data?.landmark + " , " + deliveryArea,
      );
      await storeData('addressid', response?.data.data.id.toString());
      Snackbar.show({
        text: 'Address Edited Successfully',
        textColor: 'white',
        backgroundColor: 'green',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70,
      });
      navigation.replace('Address', {cart: false});
    } catch (error) {
      setload(false);
      Snackbar.show({
        text: 'Error in editing Address',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70,
      });
      navigation.replace('Address');
      console.error('Error editing address:', error);
    }
  };
  const handledeleteaddress = async () => {
    setload(true);
    try {
      const storedAddressId = await getData('addressid');
      const id = await getData('id');
      const response = await axios.post(
        'https://newannakadosa.com/api/destroy/address',
        {
          address_id: editaddress.id,
          user_id: id,
        },
      );
      setload(false);
      Snackbar.show({
        text: 'Address Deleted Successfully',
        textColor: 'white',
        backgroundColor: 'green',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      });
      // Handle the response as needed
      console.log('Delete address response:', response.data);
      if (storedAddressId == editaddress.id) {
        await storeData('address', null);
        await storeData('addressid', null);
      }
      navigation.replace('Address', {cart: false});
      // Additional logic after successful deletion
    } catch (error) {
      setload(false);
      Alert.alert(
        'Error',
        'Error in Deleting Address',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.replace('ManageAddress');
            },
          },
        ],
        {cancelable: false},
      );
      // Handle errors, show an alert, log the error, etc.
      console.error('Error deleting address:', error);
    }
  };
  const handleRadioPress = option => {
    setSelectedOption(option);
  };
  const renderRadioButton = (option, label) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginTop: 5,
          alignItems: 'center', // Align items vertically in the center
        }}
        onPress={() => handleRadioPress(option)}>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 1.5,
            borderColor: colorScheme === 'dark' ? 'green' : 'black',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          {selectedOption === option && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 6,
                backgroundColor: colorScheme === 'dark' ? 'green' : 'black',
              }}
            />
          )}
        </View>
        <View style={{marginRight: 5, width: 50, height: 20}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: selectedOption === option ? 'normal' : 'normal',
              color: colorScheme === 'dark' ? 'black' : 'black',
            }}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Home',
        value: 'home',
      },
      {
        id: '2',
        label: 'Office',
        value: 'office',
      },
    ],
    [],
  );
  const data = area?.map(area => ({
    label: area.area_name,
    value: area.id.toString(),
  }));

  console.log('data', data)

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
        {editable ? (
          <Text
            style={{
              flex: 1,
              fontSize: 22,
              //sfontWeight: 'bold',
              color: 'black',
              marginLeft: 20,
              textAlignVertical: 'center',
            }}>
            Edit Address
          </Text>
        ) : (
          <Text
            style={{
              flex: 1,
              fontSize: 22,
              //sfontWeight: 'bold',
              color: 'black',
              marginLeft: 20,
              textAlignVertical: 'center',
            }}>
            Add New Address
          </Text>
        )}
      </View>
      <View style={{margin: 20}}>
        <View
          style={{
            //  flex: 1,
            margin: 0,
            borderBottomWidth: 1,
            borderColor: 'lightgray',
          }}>
          <Dropdown
            mode="modal"
            style={{
              color: 'black',
              paddingVertical: 5,
              // fontSize: 18,
              marginLeft: 4,
            }}
            placeholderStyle={{
              color: 'black',
              fontSize: 18,
              //    marginRight: 10,
            }}
            data={data}
            search
            labelField="label"
            valueField="value"
            placeholder={
              deliveryid == undefined
                ? 'select your area'
                : data[deliveryid - 1]?.label
            }
            searchPlaceholder="Search..."
            value={deliveryid?.toString()} // Current selected value
            onChange={item => {
              setValue(item.value);
              console.log('item', item);
              setDeliveryArea(item.label)
              setdeliveryid(item.value);
              console.log('deliveryid', deliveryid);
            }} // Update the value in the state
            selectedTextStyle={{fontSize: 18, color: 'black'}}
            inputSearchStyle={{color: 'black'}}
            itemTextStyle={{color: 'black'}}
            //containerStyle={{backgroundColor: 'white'}}
            itemContainerStyle={
              {
                //backgroundColor: 'red',
                //borderColor: 'green',
              }
            }
          />
        </View>
        <View>
          {/* <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Your address
          </Text> */}
          <TextInput
            style={{
              fontSize: 18,
              borderBottomWidth: 1,
              color: colorScheme === 'dark' ? 'black' : 'black',
              borderColor: 'lightgray',
            }}
            placeholder="Door / Flat-no"
            value={address}
            onChangeText={setAddress}
            placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'gray'}
          />
        </View>
        <View>
          {/* <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 30,
            }}>
            Nearest landmark
          </Text> */}
          <TextInput
            style={{
              fontSize: 18,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              color: colorScheme === 'dark' ? 'black' : 'black',
            }}
            placeholder="Landmark"
            value={landmark}
            onChangeText={setLandmark}
            placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'gray'}
          />
        </View>
        <View>
          {/* <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 30,
              marginBottom: 10,
            }}>
            Address Type
          </Text> */}
          <View>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              {renderRadioButton('office', 'Office')}
              {renderRadioButton('home', 'Home')}
            </View>
            {/* <RadioGroup
              radioButtons={radioButtons}
              color={'red'}
              onPress={value => {
                setSelectedId(value);
                if (value == 1) {
                  setSelectedtype('home');
                } else if (value == 2) {
                  setSelectedtype('office');
                }
              }}
              selectedId={selectedId} // Use selected gender instead of selected id
              containerStyle={{}}
              descriptionStyle={{}}
              labelStyle={{}}
              layout="row"
            /> */}
          </View>
        </View>
        <TouchableOpacity
          //onPress={() => navigation.navigate('ManageAddress')}
          onPress={!editable ? handleaddressadd : handleeditaddress}
          style={{
            marginTop: 40,
            alignSelf: 'center',
            backgroundColor: 'green',
            borderRadius: 40,
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}>
          {editable ? (
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'yellow',
              }}>
              Edit Address
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'yellow',
              }}>
              Save Address
            </Text>
          )}
        </TouchableOpacity>
        {editable && (
          <TouchableOpacity
            //   onPress={() => navigation.navigate('ManageAddress')}
            onPress={handledeleteaddress}
            style={{
              marginTop: 20,
              alignSelf: 'center',
              backgroundColor: 'red',
              borderRadius: 40,
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Delete Address
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Addaddress;

const styles = StyleSheet.create({});
