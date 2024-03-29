import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';

const CartItem = ({cartItem, updateQuantity}) => {
  //const [quantity, setQuantity] = useState(cartItem.qty);
  // const updateQuantity = async (product_id, qty) => {
  //   try {
  //     const apiUrl = 'https://techiedom.com/annakadosa/api/update/cart/';

  //     const body = {
  //       user_id: 210,
  //       product_id: product_id,
  //       qty: qty,
  //     };

  //     const response = await axios.post(apiUrl, body);
  //     console.log(body);

  //     // setQuantity(qty); // Remove this line

  //     Alert.alert('Success', 'Successfully cart updated');
  //     console.log('Quantity updated successfully!', response.data);
  //     fetchData();
  //     // Trigger a rerender
  //   } catch (error) {
  //     Alert.alert('Failed', 'Failed to update the cart.');
  //     console.error('Error updating quantity:', error);
  //   }
  // };

  const {product_id, qty} = cartItem;

  const incrementQuantity = () => {
    const newQuantity = qty + 1;
    updateQuantity(product_id, newQuantity);
  };

  const decrementQuantity = () => {
    const newQuantity = qty - 1;
    updateQuantity(product_id, newQuantity);
  };

  if (qty >= 1) {
    return (
      <View key={cartItem.product_id}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
            // flexWrap: 'wrap', // Add this property
          }}>
          <View style={{flex: 1}}>
            {/* Use alignSelf: 'flex-start' to make text left-aligned */}
            <Text
              style={{
                fontSize: 18,
                color: 'green',
                fontWeight: 'bold',
                marginBottom: 10,
                //textAlign: 'left',
              }}>
              {cartItem.product_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <TouchableOpacity onPress={() => decrementQuantity()}>
              <Image
                source={require('../assets/iconsassets/minus.png')}
                style={{width: 30, height: 30, tintColor: 'red'}}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 'bold',
                  color: 'black',
                  textAlignVertical: 'center',
                }}>
                {qty}
              </Text>
            </View>
            <TouchableOpacity onPress={() => incrementQuantity()}>
              <Image
                source={require('../assets/iconsassets/plus.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: 'red',
                  marginRight: 20,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 'bold',
                  color: 'green',
                  textAlignVertical: 'center',
                }}>
                ₹{cartItem.product_price}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

export default CartItem;
