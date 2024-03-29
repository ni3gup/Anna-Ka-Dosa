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
import {useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loading from '../loadingcomponent/loading';
import {getData} from '../utils/AsyncStorag';
import Snackbar from 'react-native-snackbar';
import RenderHTML from 'react-native-render-html';
const Productinfo = ({navigation, route}) => {
  const {width} = useWindowDimensions();
  const {item} = route.params;
  console.log(item);
  const [load, setLoad] = useState(false);
  const [Default, setDefault] = useState([]);
  const [Extra, setExtra] = useState([
    {topping: 'Cheese', price: '₹20'},
    {topping: 'Tomato ketchup', price: '₹10'},
  ]);
  const [quantity, setQuantity] = useState(item?.quantity ? item.quantity : 1);
  //const [disable, setdisable] = useState(true);
  const [select, setselect] = useState(true);
  const colorScheme = useColorScheme();
  const [showFullDescription, setShowFullDescription] = useState(true);
  if (item.averageRating < 1) {
    item.averageRating = 1;
  } else {
    item.averageRating = Math.round(item.averageRating);
  }
  roundedRating = item.averageRating;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const handleExtra = (topping, price) => {
    const data = {topping, price};

    // Check if the item already exists in Default
    const isDuplicate = Default.find(item => item.topping === data.topping);

    if (!isDuplicate) {
      setDefault(prevDefault => [...prevDefault, data]);
      setExtra(prevExtra =>
        prevExtra.filter(item => item.topping !== data.topping),
      );
      // console.log(Default);
    }
  };
  const handleDefault = itemToRemove => {
    setDefault(prevDefault =>
      prevDefault.filter(item => item !== itemToRemove),
    );
    setExtra(prevDefault => [...prevDefault, itemToRemove]);
  };

  // const updateQuantity = async newQuantity => {
  //   try {
  //     setLoad(true);
  //     const apiUrl = 'https://techiedom.com/annakadosa/api/update/cart/';
  //     const id = await getData('id');
  //     console.log('prod info id', id);
  //     const body = {
  //       user_id: id,
  //       product_id: item.id,
  //       qty: newQuantity,
  //     };
  //     console.log('body', body);
  //     const response = await axios.post(apiUrl, body);
  //     console.log('updatecart', response.data);
  //     if (response && response.data) {
  //       setQuantity(newQuantity);
  //       setLoad(false);
  //       Snackbar.show({
  //         text: 'Cart Updated Successfully',
  //         textColor: 'white',
  //         backgroundColor: 'green',
  //         duration: Snackbar.LENGTH_SHORT,
  //         marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
  //       });
  //       //Alert.alert('Success', 'Successfully cart updated');
  //       console.log('Quantity updated successfully!');
  //     } else {
  //       setLoad(false);
  //       Snackbar.show({
  //         text: 'Failed To Update Cart ',
  //         textColor: 'white',
  //         backgroundColor: 'red',
  //         duration: Snackbar.LENGTH_SHORT,
  //         marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
  //       });
  //       console.error('Failed to update quantity.');
  //     }
  //   } catch (error) {
  //     setLoad(false);
  //     Snackbar.show({
  //       text: 'Failed To Update Cart ',
  //       textColor: 'white',
  //       backgroundColor: 'red',
  //       duration: Snackbar.LENGTH_SHORT,
  //       marginBottom: 10, // Adjust this value to position the Snackbar at the desired distance from the top
  //     });
  //     console.error('Error updating quantity:', error);
  //   }
  // };
  const onAddPress = async () => {
    setLoad(true);
    const id = await getData('id');
    console.log('best seller uid', id);
    try {
      const apiUrl = 'https://newannakadosa.com/api/store/cart/'; // Replace with your actual API endpoint
      // const userId = id;

      const response = await axios.post(apiUrl, {
        user_id: id,
        product_id: item?.id,
        qty: quantity,
      });
      console.log(response);
      // If the request is successful, navigate or perform other actions
      if (response && response.data) {
        //setLoad(false);
        Snackbar.show({
          text: 'Added in Cart Successfully',
          textColor: 'white',
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
          marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
        });
        navigation.navigate('Cart');

        // You can navigate or perform any other action here
      } else {
        // setLoad(false);
        // Alert.alert('Error', 'Error in adding product to cart');
        Snackbar.show({
          text: 'Failed in adding product to cart ',
          textColor: 'white',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
          marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
        });
        console.error('Failed to add product to cart.');
      }
    } catch (error) {
      //setLoad(false);
      Snackbar.show({
        text: 'Failed in adding product to cart ',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
      });
      console.error('Error adding product to cart:', error);
    } finally {
      setLoad(false);
    }
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };
  if (load) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{backgroundColor: '#fed920', padding: 9, flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
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
            color: colorScheme === 'dark' ? 'black' : 'black',
            marginLeft: 20,
            textAlignVertical: 'center',
          }}>
          {item.name}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginBottom: 20}}>
          <Image
            source={{uri: item.thumb_image}}
            style={{
              width: '100%',
              height: 350,
            }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black', // Updated this line
              //backgroundColor: 'white',
              marginBottom: 5,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'red',
              marginBottom: 5,
            }}>
            ₹{item.price}
          </Text>
        </View>
        <View style={{marginHorizontal: 20}}>
          {/* <Text
            style={{
              fontSize: 15,
              marginBottom: 10,
            }}
            numberOfLines={showFullDescription ? undefined : 3}>
            {item.long_description}
          </Text> */}
          {/* <View> */}
          {/* <Text
            style={{
              fontSize: 15,
              marginBottom: 10,
              flex: 1,
            }}
            //  numberOfLines={showFullDescription && undefined}
          > */}
          {item?.long_description && (
            <RenderHTML
              contentWidth={width}
              source={{html: item?.long_description}}
            />
          )}
          {/* </Text> */}
          {/* </View> */}
          {/* <TouchableOpacity
            onPress={toggleDescription}
            style={{alignItems: 'flex-end'}}>
            <Text style={{color: 'red', textDecorationLine: 'underline'}}>
              {showFullDescription ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity> */}
        </View>
        <View style={{marginHorizontal: 20, flexDirection: 'row', gap: 2}}>
          {Array.from({length: roundedRating}, (_, index) => (
            <Image
              key={index}
              source={require('../assets/iconsassets/rate-usy.png')}
              style={{
                width: 20,
                height: 20,
                marginRight: 2,
              }}
              resizeMode="cover"
            />
          ))}

          <Text style={{color: colorScheme === 'dark' ? 'black' : 'black'}}>
            ({item.totalReview}) reviews
          </Text>
        </View>

        {/* <View
          style={{
            width: '100%',
            height: 0.5,
            backgroundColor: 'lightgray',
            marginVertical: 20,
          }}></View>
        <View>
          <Text
            style={{
              //flex: 1,
              fontSize: 22,
              fontWeight: 'bold',
              color: 'black',
              marginLeft: 20,
              //textAlign: 'center',
            }}>
            Add or Remove Toppings
          </Text>
        </View> */}
        {/* {Default.length > 0 && (
          <View>
            <View>
              <Text
                style={{
                  //flex: 1,
                  fontSize: 17,
                  // fontWeight: 'bold',
                  //color: 'black',
                  margin: 20,
                  //textAlign: 'center',
                }}>
                Default
              </Text>
            </View>
            {Default.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  marginBottom: 10,
                  justifyContent: 'space-between',
                  borderRadius: 10,
                  borderColor: 'gray',
                  borderWidth: 1,
                  padding: 20,
                }}>
                <View style={{flexDirection: 'row'}}>
                
                  <Text style={{fontWeight: 'bold'}}>{item.topping}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginRight: 20}}>{item.price}</Text>
                 
                  <TouchableOpacity onPress={() => handleDefault(item)}>
                    <Image
                      source={require('../assets/iconsassets/Cross.png')}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
        {Extra.length > 0 && (
          <View>
            <View>
              <Text
                style={{
                  //flex: 1,
                  fontSize: 17,
                  // fontWeight: 'bold',
                  //color: 'black',
                  margin: 20,
                  //textAlign: 'center',
                }}>
                Extras
              </Text>
            </View>
            {Extra.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  marginBottom: 10,
                  justifyContent: 'space-between',
                  borderRadius: 10,
                  borderColor: 'gray',
                  borderWidth: 1,
                  padding: 20,
                }}>
                <View style={{flexDirection: 'row'}}>
               
                  <Text style={{fontWeight: 'bold'}}>{item.topping}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginRight: 20}}>{item.price}</Text>
                  <TouchableOpacity
                    onPress={() => handleExtra(item.topping, item.price)}>
                    <Image
                      source={require('../assets/iconsassets/instruc.png')}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )} */}
        <View style={{marginTop: 100}}></View>
      </ScrollView>
      <View
        style={{
          //flex: 1,
          elevation: 10,
          position: 'absolute',
          bottom: 0,
          padding: 15,
          backgroundColor: '#fed920',
          //height: '10%',
          width: '100%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
          }}>
          <View
            style={{
              marginTop: 7,
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <View>
              <Text
                style={{
                  marginTop: 1,
                  fontSize: 19,
                  fontWeight: 'bold',
                  color: 'red',
                  textAlignVertical: 'center',
                }}>
                Price:
              </Text>
            </View>
            <View>
              <Text
                style={{
                  marginTop: 2,
                  fontSize: 19,
                  fontWeight: 'bold',
                  color: 'black',
                  textAlignVertical: 'center',
                }}>
                ₹{item.price}
              </Text>
            </View>
            <TouchableOpacity
              onPress={decrementQuantity}
              style={{marginLeft: 10}}
              disabled={quantity === 1}>
              <Image
                source={require('../assets/iconsassets/minus.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: quantity === 1 ? 'gray' : 'red',
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  marginTop: 2,
                  fontSize: 19,
                  fontWeight: 'bold',
                  color: 'black',
                  textAlignVertical: 'center',
                }}>
                {quantity}
              </Text>
            </View>
            <TouchableOpacity onPress={incrementQuantity}>
              <Image
                source={require('../assets/iconsassets/plus.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: 'red',
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
          {select ? (
            <TouchableOpacity
              onPress={onAddPress}
              style={{
                //flex: 1,
                // marginVertical: 30,
                // alignSelf: 'center',
                marginTop: 1,
                backgroundColor: 'green',
                borderRadius: 40,
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: 'yellow',
                  textAlign: 'center',
                }}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Productinfo;

const styles = StyleSheet.create({});
