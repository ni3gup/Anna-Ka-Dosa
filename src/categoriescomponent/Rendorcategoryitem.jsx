import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import Loading from '../loadingcomponent/loading';
import axios from 'axios';
import {getData} from '../utils/AsyncStorag';
import Snackbar from 'react-native-snackbar';
const RenderCategoryItem = ({item, navigation}) => {
  const [load, setLoad] = useState(false);
  // const onAddPress = async productId => {
  //   setLoad(true);
  //   const userId = await getData('id');
  //   try {
  //     const apiUrl = 'https://techiedom.com/annakadosa/api/store/cart/'; // Replace with your actual API endpoint
  //     console.log(item.id);
  //     const response = await axios.post(apiUrl, {
  //       user_id: userId,
  //       product_id: item.id,
  //       qty: 1,
  //     });

  //     console.log(response);
  //     // If the request is successful, navigate or perform other actions
  //     if (response && response.data) {
  //       setLoad(false);
  //       Snackbar.show({
  //         text: 'Added to Cart Successfully',
  //         textColor: 'white',
  //         backgroundColor: 'green',
  //         duration: Snackbar.LENGTH_SHORT,
  //         marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
  //       });
  //       navigation.navigate('Productinfo', {item: item});

  //       // You can navigate or perform any other action here
  //     } else {
  //       setLoad(false);
  //       Snackbar.show({
  //         text: 'Failed in adding product to cart ',
  //         textColor: 'white',
  //         backgroundColor: 'red',
  //         duration: Snackbar.LENGTH_SHORT,
  //         marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
  //       });
  //       console.error('Failed to add product to cart.');
  //     }
  //   } catch (error) {
  //     setLoad(false);
  //     Snackbar.show({
  //       text: 'Failed in adding product to cart ',
  //       textColor: 'white',
  //       backgroundColor: 'red',
  //       duration: Snackbar.LENGTH_SHORT,
  //       marginBottom: 70, // Adjust this value to position the Snackbar at the desired distance from the top
  //     });
  //     console.error('Error adding product to cart:', error);
  //   } finally {
  //     setLoad(false);
  //   }
  // };
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        marginTop: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 0.8,
      }}
      onPress={() => navigation.navigate('Productinfo', {item: item})}>
      <View>
        <Image
          // source={require('../assets/mainscreenassets/RecommendedItems/idli-dosa.jpg')}
          source={{uri: item.thumb_image}}
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'lightgray',
          }}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={{
            marginTop: -25,
            alignSelf: 'center',
            backgroundColor: '#fed920',
            borderRadius: 40,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginBottom: 10,
          }}
          disabled={load}
          onPress={() => navigation.navigate('Productinfo', {item: item})}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal: 8, flex: 1}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
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
        <Text
          numberOfLines={2}
          style={{
            marginBottom: 20,
            color: colorScheme === 'dark' ? 'black' : 'black',
          }}>
          {item.short_description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderCategoryItem;

const styles = StyleSheet.create({});
