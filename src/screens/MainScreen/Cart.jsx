import {
  Alert,
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
import React, {useCallback, useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Loading from '../../loadingcomponent/loading';
import axios from 'axios';
import CartItem from '../../categoriescomponent/Cartitems';
import {getData} from '../../utils/AsyncStorag';
import {useFocusEffect} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

const Cart = ({navigation, route}) => {
  const [discount, setDiscount] = useState(null);
  const colorScheme = useColorScheme();
  const [load, setLoad] = useState(false);
  const [cartData, setCartData] = useState();
  const [uid, setuid] = useState();
  const [instruction, setinstruction] = useState('');
  const [offercartdata, setOfferCartData] = useState(null);
  const [defaultaddress, setdefaultaddress] = useState(null);
  const [addid, setaddid] = useState(null);
  const [offercode, setoffercode] = useState(null);
  const [areas, setareaData] = useState([]);
  useFocusEffect(
    useCallback(() => {
      if (!route.params) {
        fetchData();
      } else {
        const data = route.params.offercartdata;
        const coupon = route.params.coupon;
        setoffercode(coupon);
        setOfferCartData(data);
        setCartData(data);
      }
    }, [route.params]),
  );
  const handleinstruction = () => {
    if (instruction.trim() == '') {
      Snackbar.show({
        text: 'Add an instruction first',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      });
      return;
    }
    Snackbar.show({
      text: ' Instruction added to the cart.',
      textColor: 'white',
      backgroundColor: 'green',
      duration: Snackbar.LENGTH_SHORT,
      marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
    });
  };
  const getareadetails = async () => {
    try {
      const response = await axios.get(
        'https://newannakadosa.com/api/delivered/area',
      );
      return response.data.data;
      // console.log('area', response.data.data)
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };
  const fetchData = async () => {
    setempty(false);
    setoffercode(null);
    // const couponcode = await getData('coupon');
    // setcoupon(couponcode);
    const areas = await getareadetails()
    const id = await getData('id');
    setuid(id);
    console.log('uid', id);
    const defaultadd = await getData('address');
    setdefaultaddress(defaultadd);
    console.log('defaultadd', defaultadd)
    const addressid = await getData('addressid');
    console.log('addressid', addressid)
    // if (addressid == null) {
    //   navigation.navigate('Address', {cart: true});
    //   Snackbar.show({
    //     text: ' Add or Select your Address.',
    //     textColor: 'white',
    //     backgroundColor: 'green',
    //     duration: Snackbar.LENGTH_SHORT,
    //     marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
    //   });
    //   return;
    // }
    setaddid(addressid);
    try {
      setLoad(true);
      const apiUrl = 'https://newannakadosa.com/api/cart/';

      const response = await axios.post(apiUrl, {
        user_id: id,
        address_id: addressid,
      });
      console.log('cart response', response.data);
      if (response.data.data.cart.length === 0) {
        setLoad(false);
        setempty(true); // Handle the case where data is not present or there's an error
        //  setDiscount(null);
        return;
      }

      setLoad(false);
      console.log(response.data.data);
      setCartData(response.data.data);
      //setDiscount(null);
    } catch (error) {
      setLoad(false);
      Snackbar.show({
        text: 'Failed To Load Cart ',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      });
      //Alert.alert('Error', 'Failed in getting the cart details.');
      setempty(true);
      console.error('Error fetching data:', error);
    }
  };

  const updateQuantity = async (product_id, qty) => {
    try {
      const id = await getData('id');
      const apiUrl = 'https://newannakadosa.com/api/update/cart/';

      const body = {
        user_id: id,
        product_id: product_id,
        qty: qty,
      };

      const response = await axios.post(apiUrl, body);
      //console.log(body);
      if (qty == 0) {
        Snackbar.show({
          text: 'Item removed from Cart.',
          textColor: 'white',
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
          marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
        });
        console.log('item removed successfully!', response.data);
        fetchData();
        return;
      }
      Snackbar.show({
        text: 'Cart Updated Successfully',
        textColor: 'white',
        backgroundColor: 'green',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      });
      //Alert.alert('Success', 'Successfully cart updated');
      console.log('Quantity updated successfully!', response.data);
      fetchData();
    } catch (error) {
      Snackbar.show({
        text: 'Failed To Update Cart ',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      });
      console.error('Error updating quantity:', error);
    }
  };

  const CartData = cartData?.cart?.map(item => ({
    product_id: item.product_id,
    qty: item.qty.toString(), // Assuming qty needs to be a string
    size: 'standard', // Assuming size is constant, change it accordingly
  }));
  console.log('cartdata', CartData);

  const [date, setdate] = useState(new Date());
  const [mode, setmode] = useState('');
  const [show, setshow] = useState(false);
  const [timetext, settimetext] = useState('');
  const [empty, setempty] = useState(false);

  const onchange = (event, selectedDate) => {
    setshow(false);
    const currentDate = selectedDate || date;
    //setshow(Platform.OS === 'android'); // Temporarily keep visible on Android
    setdate(currentDate);
    const tempDate = new Date(currentDate);

    const ftime = `${tempDate.getHours()}:${tempDate.getMinutes()}`;
    settimetext(ftime);
  };

  const showMode = currentMode => {
    setshow(!show);
    setmode(currentMode);
  };
  const handleProceedToCheckout = async () => {
    const defaultadd = await getData('address');
    setdefaultaddress(defaultadd);
    const addressid = await getData('addressid');
    setaddid(addressid);
    // Check if the necessary details are available
    // if (!CartData || !addid) {
    //   console.log(addid, CartData);
    //   // Show an error message or take appropriate action
    //   return;
    // }
    console.log(addid, CartData);
    if (addressid == null) {
      // navigation.navigate('Address', {cart: true});
      Snackbar.show({
        text: ' Add or Select your Address.',
        textColor: 'white',
        backgroundColor: 'green',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      });
      return;
    }

    // Navigate to 'Paymentmethod' screen with the required details
    navigation.navigate('Paymentmethod', {
      details: {
        cart: CartData,
        delivery_charge: cartData.delivery_fee,
        user_id: uid,
        coupon: cartData.coupon,
        coupon_code: offercode || '',
        payment_method: '',
        amount: cartData.total_price,
        total: cartData.grand_total,
        gst: cartData.gst,
        instruction: instruction,
        address_id: addid,
        online_order_id: '',
      },
    });

    // Reset route params to null
    route.params = null;
  };
  if (load) {
    return <Loading color={'white'} />;
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{backgroundColor: '#fed920', padding: 9, flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/iconsassets/left-arrow.png')}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        {empty ? (
          <Text
            style={{
              flex: 1,
              fontSize: 22,
              //sfontWeight: 'bold',
              color: 'black',
              marginLeft: 20,
              textAlignVertical: 'center',
            }}>
            Empty Cart
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
            Cart
          </Text>
        )}
      </View>
      {empty ? (
        <View
          style={{margin: 20, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/iconsassets/empty-cart.gif')}
              style={{height: 400, width: 400}}
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
              Good Food is Always Cooking
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
              Your Cart is Empty .Add something from the menu.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Menu')}
              style={{
                backgroundColor: 'green',
                padding: 15,
                alignSelf: 'center',
                borderRadius: 40,
                marginTop: 25,
              }}>
              <Text style={{fontSize: 16, color: 'yellow', fontWeight: 'bold'}}>
                Explore Menu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate('Address', {cart: false})}>
            <View
              style={{
                borderBottomColor: 'lightgray',
                // borderBottomWidth: 0.8,
                marginVertical: 10,
                paddingHorizontal: 10,
                padding: 2.5,
              }}>
              <View View style={{flexDirection: 'row'}}>
                <View>
                  <Image
                    source={require('../../assets/iconsassets/location.png')}
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: 'red',
                    }}
                  />
                </View>
                <View style={{flex: 1, marginLeft: 5}}>
                  {/* //<View style={{marginVertical: 10, flex: 1}}> */}
                  <Text
                    style={{
                      //  flex: 1,
                      fontSize: 17,
                      //sfontWeight: 'bold',
                      color: 'black',

                      //textAlignVertical: 'center',
                    }}>
                    {defaultaddress != null
                      ? defaultaddress
                      : 'Select your Address'}
                  </Text>
                  {/* // </View> */}
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Address', {cart: false})}>
                  <Text
                    style={{
                      //  flex: 1,
                      fontSize: 16,
                      //sfontWeight: 'bold',
                      color: 'red',
                      marginLeft: 20,
                      textAlignVertical: 'center',
                    }}>
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginHorizontal: 20}}>
            <View
              style={{
                borderBottomWidth: 0.8,
                borderColor: 'lightgray',
                // marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 23,
                  color: 'black',
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}>
                Order List
              </Text>
            </View>
            {
              //cartData &&
              cartData?.cart?.map((cartItem, index) => (
                <CartItem
                  key={cartItem.product_id}
                  cartItem={cartItem}
                  updateQuantity={updateQuantity}
                  // other props...
                />
              ))
            }

            <View
              style={{
                marginVertical: 10,

                borderRadius: 20,
                borderWidth: 0.3,
                borderColor: 'gray',
                padding: 8,
              }}>
              <TouchableOpacity
                //onPress={handleinstruction}
                style={{
                  flexDirection: 'row',
                  borderBottomColor: 'lightgray',
                  //borderBottomWidth: 0.5,
                  // marginVertical: 5,
                  // paddingBottom: 10,
                }}>
                <TouchableOpacity onPress={handleinstruction}>
                  <Image
                    source={require('../../assets/iconsassets/instruc.png')}
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 10,
                      marginLeft: 8,
                    }}
                  />
                </TouchableOpacity>

                <TextInput
                  placeholder="Write instructions for Anna ka dosa"
                  style={{
                    // flex: 1,
                    fontSize: 15,

                    color: 'black',
                    marginLeft: 10,
                  }}
                  placeholderTextColor={
                    colorScheme === 'dark' ? 'gray' : 'gray'
                  }
                  value={instruction}
                  onChangeText={setinstruction}
                  onSubmitEditing={handleinstruction}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                //    marginVertical: 10,

                borderRadius: 20,
                borderWidth: 0.3,
                borderColor: 'gray',
                padding: 15,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Annaoffer')}
                style={{
                  flexDirection: 'row',
                  borderBottomColor: 'lightgray',
                  //borderBottomWidth: 0.5,
                  // marginVertical: 5,
                  // paddingBottom: 10,
                }}>
                <TouchableOpacity
                //onPress={() => navigation.navigate('Rateus')}
                >
                  <Image
                    source={require('../../assets/iconsassets/offer.png')}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: 'red',
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
                  Apply Anna Dosa Offer
                </Text>
                <TouchableOpacity
                  style={{borderRadius: 40, overflow: 'hidden'}}
                  onPress={() => navigation.navigate('Annaoffer')}>
                  <Image
                    source={require('../../assets/iconsassets/arrowr.png')}
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
              marginVertical: 10,

              borderRadius: 20,
              borderWidth: 0.3,
              borderColor: 'gray',
              padding: 15,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Addgiftcard')}
              style={{
                flexDirection: 'row',
                borderBottomColor: 'lightgray',
                //borderBottomWidth: 0.5,
                // marginVertical: 5,
                // paddingBottom: 10,
              }}>
              <TouchableOpacity
              //onPress={() => navigation.navigate('Rateus')}
              >
                <Image
                  source={require('../../assets/iconsassets/gift-card.png')}
                  style={{
                    width: 30,
                    height: 30,
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
                Add Gift Card
              </Text>
              <TouchableOpacity
                style={{borderRadius: 40, overflow: 'hidden'}}
                //  onPress={() => navigation.navigate('Rateus')}
              >
                <Image
                  source={require('../../assets/iconsassets/arrowr.png')}
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
            {/* <View
            style={{
              //    marginVertical: 10,

              borderRadius: 20,
              borderWidth: 0.3,
              borderColor: 'gray',
              padding: 15,
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => showMode('time')}
              style={{
                flexDirection: 'row',
                borderBottomColor: 'lightgray',
                //borderBottomWidth: 0.5,
                // marginVertical: 5,
                // paddingBottom: 10,
              }}>
              <TouchableOpacity
              //onPress={() => navigation.navigate('Rateus')}
              >
                <Image
                  source={require('../../assets/iconsassets/odering-time.png')}
                  style={{
                    width: 30,
                    height: 30,
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
                Ordering Time: {timetext}
              </Text>
              <TouchableOpacity
                style={{borderRadius: 40, overflow: 'hidden'}}
                onPress={() => showMode('time')}>
                <Image
                  source={require('../../assets/iconsassets/arrowr.png')}
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
            <View style={{borderBottomWidth: 0.8, borderColor: 'lightgray'}}>
              <Text
                style={{
                  fontSize: 23,
                  color: 'black',
                  fontWeight: 'bold',
                  marginBottom: 10,
                  marginTop: 30,
                }}>
                Bill Details
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontSize: 19,
                    color: 'gray',

                    marginBottom: 10,
                  }}>
                  Subtotal
                </Text>

                <Text
                  style={{
                    fontSize: 19,
                    color: 'black',

                    marginBottom: 10,
                  }}>
                  ₹{cartData?.total_price}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontSize: 19,
                    color: 'gray',

                    marginBottom: 10,
                  }}>
                  Delivery charge
                </Text>

                <Text
                  style={{
                    fontSize: 19,
                    color: 'black',

                    marginBottom: 10,
                  }}>
                  + ₹{cartData?.delivery_fee}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontSize: 19,
                    color: 'gray',

                    marginBottom: 10,
                  }}>
                  Discount({offercode != null ? offercode : 'offer'})
                </Text>
                <Text
                  style={{
                    fontSize: 19,
                    color: 'green',

                    marginBottom: 10,
                  }}>
                  - ₹{cartData?.coupon}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontSize: 19,
                    color: 'gray',

                    marginBottom: 10,
                  }}>
                  GST(5%)
                </Text>
                <Text
                  style={{
                    fontSize: 19,
                    color: 'black',

                    marginBottom: 20,
                  }}>
                  + ₹{cartData?.gst}
                </Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: 19,
                  color: 'black',
                  fontWeight: 'bold',
                  marginBottom: 10,
                  marginTop: 10,
                }}>
                Total
              </Text>
              <Text
                style={{
                  fontSize: 19,
                  color: 'black',
                  marginTop: 10,
                  marginBottom: 10,
                  fontWeight: 'bold',
                }}>
                ₹{cartData?.grand_total}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleProceedToCheckout}
              style={{
                marginVertical: 30,
                alignSelf: 'center',
                backgroundColor: 'green',
                borderRadius: 40,
                paddingHorizontal: 15,
                paddingVertical: 15,
              }}>
              {/* // onPress={() => {
              //   navigation.navigate('Paymentmethod', {
              //     details: {
              //       cart: CartData,
              //       //order_id: response?.data?.data?.order_id,
              //       delivery_charge: cartData?.delivery_fee,
              //       user_id: uid,
              //       coupon: cartData?.coupon,
              //       coupon_code: offercode == null ? '' : offercode,
              //       payment_method: '',
              //       amount: cartData?.total_price,
              //       total: cartData?.grand_total,
              //       gst: cartData?.gst,
              //       //optional_item_price: '0',
              //       instruction: instruction,
              //       address_id: addid,
              //       online_order_id: '',
              //     },
              //   });
              //   route.params = null;
              // }}
              // // {
              // //   let details = {
              // //     cart: CartData,
              // //     //order_id: response?.data?.data?.order_id,
              // //     delivery_charge: cartData?.delivery_fee,
              // //     user_id: uid,
              // //     coupon: cartData?.coupon,
              // //     coupon_code: offercode == null ? '' : offercode,
              // //     payment_method: '',
              // //     amount: cartData?.total_price,
              // //     total: cartData?.grand_total,
              // //     gst: cartData?.gst,
              // //     //optional_item_price: '0',
              // //     instruction: instruction,
              // //     address_id: addid,
              // //   };
              // //   console.log(details);
              // // }

              // //onPress={handlecreateOrder}
              // style={{
              //   marginVertical: 30,
              //   alignSelf: 'center',
              //   backgroundColor: 'green',
              //   borderRadius: 40,
              //   paddingHorizontal: 15,
              //   paddingVertical: 15,
                // }}> */}

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'yellow',
                }}>
                Proceed To Checkout
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
