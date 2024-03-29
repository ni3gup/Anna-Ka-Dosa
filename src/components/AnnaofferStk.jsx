import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Loading from '../loadingcomponent/loading';
import axios from 'axios';
import {getData, storeData} from '../utils/AsyncStorag';
import Snackbar from 'react-native-snackbar';

const Annaoffer = ({navigation}) => {
  const [coupon, setcoupon] = useState('');
  const [load, setLoad] = useState(false);
  const [coupondata, setCoupondata] = useState(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    fetchCouponData();
  }, []);
  const fetchCouponData = async () => {
    try {
      setLoad(true);

      const response = await axios.get(
        'https://newannakadosa.com/api/coupon/list',
      );

      // Handle the response data here
      console.log(response.data.data.length);
      setCoupondata(response.data.data);
    } catch (error) {
      // Handle errors
      console.error('Error making GET request:', error);
    } finally {
      setLoad(false);
    }
  };

  const handleCoupon = async () => {
    try {
      setLoad(true);
      if (coupon.trim() === '') {
        fetchCouponData();

        return;
      }
      const response = await axios.post(
        'https://newannakadosa.com/api/coupon',
        {coupon_code: coupon.toLowerCase()},
      );

      // Handle the response data here
      console.log('search coupon', response?.data.data);
      setCoupondata(response.data.data);
      // Set loading to false after the request is complete
      ///  setLoad(false);
      //setCoupondata('');
    } catch (error) {
      // Handle errors
      console.error('Error making POST request:', error);

      // Set loading to false in case of an error
      // setLoad(false);
    } finally {
      setLoad(false);
    }
  };
  const handleapply = async code => {
    try {
      const addressid = await getData('addressid');
      if (addressid == null) {
        navigation.navigate('Address', {cart: false});
        Snackbar.show({
          text: 'Select or Add your Address',
          textColor: 'white',
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
          marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
        });
        return;
      }
      setLoad(true);
      const id = await getData('id');
      const response = await axios.post(
        'https://newannakadosa.com/api/apply/coupon',
        {coupon_code: code, user_id: id, address_id: addressid},
      );
      console.log('responsw', response.data);
      // Handle the response data here
      if (response.data.status_code === 200) {
        console.log('offer', response.data);
        Snackbar.show({
          text: 'Offer applied to cart ,Successfully! ',
          textColor: 'white',
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
          marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
        });
        //await storeData('coupon', code);
        //console.log(response.data.data);
        navigation.navigate('Cart', {
          offercartdata: response.data.data,
          coupon: code,
        });
      } else {
        Snackbar.show({
          text: 'Offer not valid for your cart  ',
          textColor: 'white',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
          marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
        });
        navigation.navigate('Cart');
        console.log('offer', response.data);
      }
      //setCoupondata(response.data.data);
      // Set loading to false after the request is complete
      ///  setLoad(false);
    } catch (error) {
      // Handle errors
      console.error('Error making POST request:', error);

      // Set loading to false in case of an error
      // setLoad(false);
    } finally {
      setLoad(false);
    }
  };
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
        <Text
          style={{
            flex: 1,
            fontSize: 22,
            //sfontWeight: 'bold',
            color: 'black',
            marginLeft: 20,
            textAlignVertical: 'center',
          }}>
          Anna Ka Dosa Offer
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View style={{margin: 20}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 10,
            }}>
            Enter Your coupan code here
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={{
                flex: 1,
                fontSize: 18,
                borderBottomWidth: 1,
                borderColor: 'lightgray',
                color: colorScheme === 'dark' ? 'black' : 'black',
              }}
              placeholder="eg. LP1234"
              onChangeText={setcoupon}
              value={coupon}
              placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'gray'}
            />
            <TouchableOpacity
              onPress={handleCoupon}
              style={{
                backgroundColor: 'red',
                alignSelf: 'center',
                paddingHorizontal: 16,
                paddingVertical: 13,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  textAlignVertical: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{backgroundColor: 'lightgray', padding: 10}}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              //fontWeight: 'bold',
            }}>
            Available Coupons
          </Text>
        </View>
        <View style={{margin: 20}}>
          {coupondata == undefined && (
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <View
                style={{
                  // backgroundColor: 'green',
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
                  No coupons to show.
                </Text>
              </View>
            </View>
          )}
          {coupondata?.length > 0 &&
            coupondata?.map((coupon, index) => (
              <View
                key={coupon?.id}
                style={{
                  marginBottom: 20,
                  borderBottomWidth: 0.8,
                  borderColor: 'lightgray',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'green',
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      {coupon?.code}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={
                      () => handleapply(coupon?.code)
                      // navigation.navigate('Cart', {discount: coupon})
                    }
                    style={{alignSelf: 'center'}}>
                    <Text style={{fontSize: 17, color: 'red'}}>Apply</Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 10}}>
                  <Text style={{fontSize: 17, color: 'black'}}>
                    {coupon?.name}
                  </Text>
                </View>
                <View style={{marginVertical: 10}}>
                  <Text style={{fontSize: 15, color: 'gray'}}>
                    Valid only on Min. purchase of ₹{coupon.min_purchase_price}
                    and Max. quantity of {coupon.max_quantity} Upto ₹
                    {coupon?.discount} off.
                  </Text>
                </View>
              </View>
            ))}

          {/* <View
            style={{
              marginBottom: 20,
              borderBottomWidth: 0.8,
              borderColor: 'lightgray',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  backgroundColor: 'green',
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
                  LP2050
                </Text>
              </View>
              <TouchableOpacity style={{alignSelf: 'center'}}>
                <Text style={{fontSize: 17, color: 'red'}}>Apply</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 17, color: 'black'}}>
                Get your 2nd Pizza at 50% off
              </Text>
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 15, color: 'gray'}}>
                Valid only on Regular,Medium and Large Pizza.
              </Text>
            </View>
          </View>
          <View
            style={{
              marginBottom: 20,
              borderBottomWidth: 0.8,
              borderColor: 'lightgray',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  backgroundColor: 'green',
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
                  LPD503
                </Text>
              </View>
              <TouchableOpacity style={{alignSelf: 'center'}}>
                <Text style={{fontSize: 17, color: 'red'}}>Apply</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 17, color: 'black'}}>
                Get Flat Discount of ₹15 on Minimum Billing of ₹250
              </Text>
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 15, color: 'gray'}}>
                Cannot be clubbed with any other offers.Not valid on Classic
                maniacs pizza.Beverages amd combos.
              </Text>
            </View>
          </View>
          <View
            style={{
              marginBottom: 20,
              borderBottomWidth: 0.8,
              borderColor: 'lightgray',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  backgroundColor: 'green',
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
                  LPD100
                </Text>
              </View>
              <TouchableOpacity style={{alignSelf: 'center'}}>
                <Text style={{fontSize: 17, color: 'red'}}>Apply</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 17, color: 'black'}}>
                Get Flat Discount of ₹50 on Minimum Billing of ₹500
              </Text>
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 15, color: 'gray'}}>
                Not valid on Classic maniacs pizza ,Beverages and Combos.
              </Text>
            </View>
          </View>
          <View
            style={{
              marginBottom: 20,
              borderBottomWidth: 0.8,
              borderColor: 'lightgray',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  backgroundColor: 'green',
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
                  LPD305
                </Text>
              </View>
              <TouchableOpacity style={{alignSelf: 'center'}}>
                <Text style={{fontSize: 17, color: 'red'}}>Apply</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 17, color: 'black'}}>
                Buy 1 Get 1 free on your second order
              </Text>
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 15, color: 'gray'}}>
                Valid only on Regular,Medium and Large Pizza
              </Text>
            </View>
          </View>
          <View style={{}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  backgroundColor: 'green',
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
                  LPD1F0
                </Text>
              </View>
              <TouchableOpacity style={{alignSelf: 'center'}}>
                <Text style={{fontSize: 17, color: 'red'}}>Apply</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 17, color: 'black'}}>
                Get Upto 40% Discount On Your First Five Order
              </Text>
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 15, color: 'gray'}}>
                Valid only on Regular,Medium and Large for chinese and
                continental foods
              </Text>
            </View>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Annaoffer;

const styles = StyleSheet.create({});
