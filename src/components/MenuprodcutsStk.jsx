import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loading from '../loadingcomponent/loading';
import RenderCategoryItem from '../categoriescomponent/Rendorcategoryitem';

const Menuproducts = ({navigation, route}) => {
  const {item} = route.params;
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false);
  if (item) {
    useEffect(() => {
      const fetchData = async () => {
        setLoad(true);
        try {
          const apiUrl = 'https://newannakadosa.com/api/categories-product';
          const body = {category_id: item.id};
          const response = await axios.post(apiUrl, body);
          //console.log('response for particular product', response.data.data);
          setProducts(response.data.data);
          setLoad(false);
        } catch (error) {
          setLoad(false);
          console.error('Error fetching data:', error);
          setError('An error occurred while fetching data.');
        }
      };

      fetchData();
    }, []);
  } else {
    useEffect(() => {
      const fetchData = async () => {
        setLoad(true);
        try {
          const apiUrl = 'https://newannakadosa.com/api/products';

          const response = await axios.get(apiUrl);
          //console.log(response.data.data);
          setProducts(response.data.data);
          setLoad(false);
        } catch (error) {
          setLoad(false);
          console.error('Error fetching data:', error);
          setError('An error occurred while fetching data.');
        }
      };

      fetchData();
    }, []);
  }

  if (load) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
            color: 'black',
            marginLeft: 20,
            textAlignVertical: 'center',
          }}>
          {item.name}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Searchmenu', {id: item.id})}>
          <Image
            source={require('../assets/iconsassets/Search.png')}
            style={{
              width: 28,
              height: 28,
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 20}}>
        <View style={{marginTop: 20}}>
          <FlatList
            scrollEnabled={false}
            data={products}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <RenderCategoryItem item={item} navigation={navigation} />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menuproducts;

const styles = StyleSheet.create({});
