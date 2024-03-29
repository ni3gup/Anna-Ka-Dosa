import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import RadioGroup from 'react-native-radio-buttons-group';
import DateTimePicker from '@react-native-community/datetimepicker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import axios from 'axios';
import Loading from '../../loadingcomponent/loading';
import {getData, storeData} from '../../utils/AsyncStorag';
import {useLogin} from '../../utils/LoginproviderContext';
import Snackbar from 'react-native-snackbar';
const Signup = ({navigation}) => {
  // const [selectedId, setSelectedId] = useState();
  // const [selectedGender, setSelectedGender] = useState('');
  const [date, setdate] = useState(new Date());
  const [mode, setmode] = useState('');
  const [show, setshow] = useState(false);
  const [datetext, setdatetext] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [load, setLoad] = useState(false);
  const {setIsLoggedin} = useLogin();
  const colorScheme = useColorScheme();
  const [selectedOption, setSelectedOption] = useState(null);
  const onchange = (event, selectedDate) => {
    setshow(false);
    const currentDate = selectedDate || date;
    //setshow(Platform.OS === 'android'); // Temporarily keep visible on Android
    setdate(currentDate);
    const tempDate = new Date(currentDate);
    const fdate = `${tempDate.getDate()}-${
      tempDate.getMonth() + 1
    }-${tempDate.getFullYear()}`;

    //const ftime = `${tempDate.getHours()}:${tempDate.getMinutes()}`;
    setdatetext(fdate);
  };

  const showMode = currentMode => {
    setshow(!show);
    setmode(currentMode);
  };
  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Male',
        value: 'female',
      },
      {
        id: '2',
        label: 'Female',
        value: 'female',
      },
    ],
    [],
  );
  // useEffect(() => {
  //   console.log('selectedid', selectedId);
  //   console.log('selectgender', selectedGender);
  // }, [selectedId]);
  const handleRegister = async () => {
    try {
      setLoad(true);
      const uid = await getData('uid');

      // Check if required data is available
      if (fullname && email && selectedOption && datetext) {
        const userData = {
          user_id: uid,
          name: fullname,
          email: email,
          gender: selectedOption,
          dob: datetext,
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new Error('Enter correct Email format.');
        }

        console.log('User Data:', userData);

        const response = await axios.post(
          'https://newannakadosa.com/api/welcome/profile',
          userData,
        );

        console.log('API response id:', response.data.data.id);
        await storeData('id', response.data.data.id);
        setLoad(false);
        Snackbar.show({
          text: 'Registered Successfully.',
          textColor: 'white',
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
          marginBottom: 70,
        });

        if (response.data.data.id) {
          setIsLoggedin(true);
        }
      } else {
        setLoad(false);
        throw new Error('Please fill in all the fields');
      }
    } catch (error) {
      setLoad(false);
      Snackbar.show({
        text: error.message || 'Failed to register. Please try again.',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70,
      });
      console.error('API error:', error);
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
              fontSize: 14,
              fontWeight: selectedOption === option ? 'normal' : 'normal',
              color: colorScheme === 'dark' ? 'black' : 'black',
            }}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (load) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      {show && (
        <DateTimePicker
          testID="datetimepicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onchange}
        />
      )}
      <View style={{backgroundColor: '#fed920', padding: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Image
            source={require('../../assets/iconsassets/left-arrow.png')}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white', margin: 20}}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 10,
          }}>
          Welcome
        </Text>
        <Text
          style={{
            fontSize: 20,
            //fontWeight: 'bold',
            color: 'gray',
            marginVertical: 10,
          }}>
          Help us know You Better!
        </Text>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 30,
            }}>
            Full Name
          </Text>
          <TextInput
            style={{
              fontSize: 18,
              borderBottomWidth: 1,
              color: colorScheme === 'dark' ? 'black' : 'black',
              borderColor: 'lightgray',
            }}
            placeholder="Your full Name"
            onChangeText={setFullname}
            value={fullname}
            placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'gray'}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 25,
            }}>
            Email Address
          </Text>
          <TextInput
            style={{
              fontSize: 18,
              borderBottomWidth: 1,
              color: colorScheme === 'dark' ? 'black' : 'black',
              borderColor: 'lightgray',
            }}
            keyboardType="email-address"
            placeholder="Your Email Address"
            onChangeText={setEmail}
            value={email}
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
              marginBottom: 10,
            }}>
            Gender
          </Text>
          <View>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
              {renderRadioButton('male', 'Male')}
              {renderRadioButton('female', 'Female')}
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 20,
            }}>
            Date Of Birth
          </Text>
          <TouchableOpacity onPress={() => showMode('date')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: 'lightgray',
              }}>
              <TextInput
                style={{
                  fontSize: 18,
                  color: 'black',
                }}
                placeholder="DD-MM-YYYY"
                editable={false}
                value={datetext}
                placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'gray'}
              />
              <View style={{margin: 7}}>
                <Image
                  source={require('../../assets/iconsassets/calender-icon.png')}
                  style={{height: 30, width: 30}}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 30, flexDirection: 'row'}}>
          <BouncyCheckbox
            size={20}
            fillColor="green"
            unfillColor="#FFFFFF"
            //text="Custom Checkbox"
            iconStyle={{borderColor: 'green', borderRadius: 5}}
            innerIconStyle={{borderWidth: 2, borderRadius: 5}}
            textStyle={{fontFamily: 'JosefinSans-Regular'}}
            onPress={isChecked => {}}
          />
          <Text
            style={{
              fontSize: 16,
              //fontWeight: 'bold',
              color: colorScheme === 'dark' ? 'gray' : 'gray',
            }}>
            I agree to recieve promotional service.
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleRegister}
          //onPress={() => navigation.replace('Main')}
          style={{
            marginTop: 40,
            alignSelf: 'center',
            backgroundColor: '#fed920',
            borderRadius: 40,
            //padding: 20,
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
