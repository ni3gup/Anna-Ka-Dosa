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
import RenderCategoryItem from '../../categoriescomponent/Rendorcategoryitem';
import Loading from '../../loadingcomponent/loading';

const Offeritem = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState();
  const [load, setLoad] = useState(false);
  useEffect(() => {
    fetchData();
    fetchBanner();
  }, []);
  const fetchData = async () => {
    setLoad(true);
    try {
      //const apiUrl = 'https://techiedom.com/annakadosa/api/products';

      const response = await axios.get(
        'https://newannakadosa.com/api/offer/product',
      );
      //console.log(response.data.data);
      setProducts(response.data.data);
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error('Error fetching data:', error);
      // setError('An error occurred while fetching data.');
    }
  };
  const fetchBanner = async () => {
    setLoad(true);
    try {
      //const apiUrl = 'https://techiedom.com/annakadosa/api/products';

      const response = await axios.get(
        'https://newannakadosa.com/api/offered/product',
      );
      console.log(response.data.data);
      setBanner(response.data.data);
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error('Error fetching data:', error);
      // setError('An error occurred while fetching data.');
    }
  };
  if (load) {
    return <Loading color={'white'} />;
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          backgroundColor: '#fed920',
          padding: 10,
          flexDirection: 'row',

          // paddingHorizontal: 15,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Image
            source={require('../../assets/iconsassets/menu.png')}
            style={{
              width: 26,
              height: 26,
              marginTop: 7,
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <TouchableOpacity style={{flexDirection: 'row', marginLeft: 5}}>
            <Text style={{color: 'gray'}}> Outlet</Text>
          </TouchableOpacity>
          <Text
            style={{
              //flex: 1,
              fontSize: 14,
              fontWeight: 'bold',
              color: 'green',
              marginLeft: 10,
              textAlignVertical: 'center',
              marginBottom: -6,
            }}>
            Kalkaji Extn,Kalkaji,Delhi 110045
          </Text>
        </View>
        <TouchableOpacity
          style={{margin: 3, borderRadius: 60, overflow: 'hidden'}}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../../assets/iconsassets/user-photo.png')}
            style={{
              width: 28,
              height: 28,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{marginHorizontal: 20}}
        showsVerticalScrollIndicator={false}>
        {banner && (
          <View
            style={{
              marginVertical: 20,
              borderRadius: 30,
              overflow: 'hidden',
              position: 'relative',
            }}>
            <Image
              source={{uri: banner?.image}}
              style={{height: 200, width: '100%'}}
            />
            <View
              style={{
                flex: 1,
                position: 'absolute',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Searchmenu', {
                    id: banner.category_id,
                  })
                }
                style={{
                  backgroundColor: 'black',
                  borderRadius: 20,
                  padding: 10,
                  marginTop: 140,
                  // position: 'relative',
                  // bottom: 10,
                }}>
                <Text style={{color: 'yellow'}}>Order Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View>
          <Text
            style={{
              //flex: 1,
              fontSize: 25,
              fontWeight: 'bold',
              color: 'black',
              //marginLeft: 10,
              //textAlign: 'center',
              marginTop: 10,
            }}>
            Offer Items
          </Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={products}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <RenderCategoryItem item={item} navigation={navigation} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Offeritem;

const styles = StyleSheet.create({});
