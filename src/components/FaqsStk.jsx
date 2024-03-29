import React, {useEffect, useState} from 'react';
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
import Loading from '../loadingcomponent/loading';
import axios from 'axios';
import RenderHTML from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
const Faqs = ({navigation}) => {
  const {width} = useWindowDimensions();
  const [faqsdata, setFaqsData] = useState([]);
  const [load, setLoad] = useState(false);
  const [showItems, setShowItems] = useState({});
  const colorScheme = useColorScheme();
  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleShowItem = id => {
    setShowItems(prevShowItems => ({
      ...prevShowItems,
      [id]: !prevShowItems[id],
    }));
  };

  const fetchFaqs = async () => {
    setLoad(true);
    try {
      const response = await axios.get('https://newannakadosa.com/api/faq/');
      console.log(response?.data?.data);
      setFaqsData(response?.data?.data);
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error('Error fetching FAQ data:', error);
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
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
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
            color: 'black',
            marginLeft: 20,
            textAlignVertical: 'center',
          }}>
          FAQs
        </Text>
      </View>
      <ScrollView
        style={{marginHorizontal: 20}}
        showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 20}}>
          {faqsdata?.map(data => (
            <TouchableOpacity
              key={data.id}
              onPress={() => handleShowItem(data.id)}
              style={{
                borderBottomWidth: 0.8,
                borderColor: 'lightgray',
                marginBottom: 20,
              }}>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: colorScheme === 'dark' ? 'black' : 'black', // Updated this line
                    //backgroundColor: 'white',
                  }}>
                  {data?.question}
                </Text>
                <View>
                  <Image
                    source={require('../assets/iconsassets/dropdown.png')}
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: 'red',
                    }}
                  />
                </View>
              </View>
              <View style={{marginBottom: showItems ? 10 : 0}}>
                {showItems[data.id] && (
                  // <View style={{marginBottom: 20}}>
                  //   <Text>{data?.answer}</Text>
                  // </View>
                  <RenderHTML
                    contentWidth={width}
                    source={{html: data?.answer}}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Faqs;

const styles = StyleSheet.create({});
