import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CategoryItem = ({item, navigation}) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('Menuproducts', {item: item})}
    style={{
      alignSelf: 'center',
      //padding: 5,
      height: 150,
      width: 110,
    }}>
    <View
      style={
        {
          //alignSelf: 'center'
        }
      }>
      <Image
        //source={require('../assets/mainscreenassets/CategoryImage/category-1.png')}
        source={{uri: item.thumb_image}}
        style={{
          width: 100,
          height: 100,
          marginLeft: 5,
        }}
      />
      <View style={{}}>
        <Text
          style={{
            flexDirection: 'column',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black',
          }}>
          {item.name}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default CategoryItem;

const styles = StyleSheet.create({});
