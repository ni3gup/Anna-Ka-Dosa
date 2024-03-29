import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loading from '../loadingcomponent/loading';
import {useWindowDimensions} from 'react-native';
import RenderHTML from 'react-native-render-html';

const About = ({navigation}) => {
  const {width} = useWindowDimensions();
  const [load, setLoad] = useState(false);
  const [details, setDetails] = useState('');
  const colorScheme = useColorScheme();
  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    setLoad(true);
    try {
      const response = await axios.get(
        'https://newannakadosa.com/api/about/us',
      );

      // Assuming the API returns a JSON object
      const data = response.data.data;

      // Do something with the fetched details
      console.log('Fetched Details:', data);
      setDetails(data.about_us);
      // You can return the fetched details or process them further
    } catch (error) {
      // Handle errors here
      console.error('Error fetching details in about us :', error.message);
      throw error; // Rethrow the error or handle it as needed
    } finally {
      setLoad(false);
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
            color: colorScheme === 'dark' ? 'black' : 'black',
            marginLeft: 20,
            textAlignVertical: 'center',
          }}>
          About Us
        </Text>
      </View>
      <ScrollView
        style={{marginHorizontal: 20}}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
              fontSize: 25,
              color: 'black',
              fontWeight: 'bold',
              marginVertical: 20,
            }}>
            Our Story
          </Text>
        </View>

        <View>
          <RenderHTML contentWidth={width} source={{html: details}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({});
