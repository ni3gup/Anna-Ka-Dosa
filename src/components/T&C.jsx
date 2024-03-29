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
import Loading from '../loadingcomponent/loading';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
const Terms = ({navigation}) => {
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
        'https://newannakadosa.com/api/terms/condition',
      );

      // Assuming the API returns a JSON object
      const data = response.data.data;

      // Do something with the fetched details
      console.log('Fetched Details:', data);
      setDetails(data.terms_and_condition);

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
            color: 'black',
            marginLeft: 20,
            textAlignVertical: 'center',
          }}>
          Terms & Conditions
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 20}}>
        <View style={{marginTop: 20}}>
          {details && (
            <RenderHtml contentWidth={width} source={{html: details}} />
          )}
        </View>
        {/* <View>
          <Text
            style={{
              fontSize: 14,
              color: 'gray',

              marginBottom: 20,
            }}>
            Eget nulla adipiscing nullam enim nec, magna. Vel lobortis feugiat
            parturient arcu sit tincidunt lacus.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'gray',

              marginBottom: 20,
            }}>
            Auctor turpis vitae facilisis feugiat tellus cursus. Dis arcu eget
            odio arcu consectetur turpis. Sit tempor, ac ultricies ullamcorper.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'gray',

              marginBottom: 20,
            }}>
            Lectus ac cursus vitae diam faucibus placerat fusce nisl, lorem.
            Sapien ullamcorper in id vitae rhoncus, turpis pellentesque neque
            blandit.
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 22,
              color: 'black',
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Use of Content
          </Text>
          <View>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Eget nulla adipiscing nullam enim nec, magna. Vel lobortis feugiat
              parturient arcu sit tincidunt lacus.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Auctor turpis vitae facilisis feugiat tellus cursus. Dis arcu eget
              odio arcu consectetur turpis. Sit tempor, ac ultricies
              ullamcorper.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Lectus ac cursus vitae diam faucibus placerat fusce nisl, lorem.
              Sapien ullamcorper in id vitae rhoncus, turpis pellentesque neque
              blandit.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Lectus ac cursus vitae diam faucibus placerat fusce nisl, lorem.
              Sapien ullamcorper in id vitae rhoncus, turpis pellentesque neque
              blandit.
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 22,
              color: 'black',
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Acceptable App Use
          </Text>
          <View>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Eget nulla adipiscing nullam enim nec, magna. Vel lobortis feugiat
              parturient arcu sit tincidunt lacus.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Auctor turpis vitae facilisis feugiat tellus cursus. Dis arcu eget
              odio arcu consectetur turpis. Sit tempor, ac ultricies
              ullamcorper.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Lectus ac cursus vitae diam faucibus placerat fusce nisl, lorem.
              Sapien ullamcorper in id vitae rhoncus, turpis pellentesque neque
              blandit.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Lectus ac cursus vitae diam faucibus placerat fusce nisl, lorem.
              Sapien ullamcorper in id vitae rhoncus, turpis pellentesque neque
              blandit.
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 22,
              color: 'black',
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Indemnity
          </Text>
          <View>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Eget nulla adipiscing nullam enim nec, magna. Vel lobortis feugiat
              parturient arcu sit tincidunt lacus. Eget nulla adipiscing nullam
              enim nec, magna. Vel lobortis feugiat parturient arcu sit
              tincidunt lacus.
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 22,
              color: 'black',
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Liability
          </Text>
          <View>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Eget nulla adipiscing nullam enim nec, magna. Vel lobortis feugiat
              parturient arcu sit tincidunt lacus.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Auctor turpis vitae facilisis feugiat tellus cursus. Dis arcu eget
              odio arcu consectetur turpis. Sit tempor, ac ultricies
              ullamcorper.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Lectus ac cursus vitae diam faucibus placerat fusce nisl, lorem.
              Sapien ullamcorper in id vitae rhoncus, turpis pellentesque neque
              blandit.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Lectus ac cursus vitae diam faucibus placerat fusce nisl, lorem.
              Sapien ullamcorper in id vitae rhoncus, turpis pellentesque neque
              blandit.
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 22,
              color: 'black',
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Disclaimer of Damages
          </Text>
          <View>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Eget nulla adipiscing nullam enim nec, magna. Vel lobortis feugiat
              parturient arcu sit tincidunt lacus. Auctor turpis vitae facilisis
              feugiat tellus cursus. Dis arcu eget odio arcu consectetur turpis.
              Sit tempor, ac ultricies ullamcorper.
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Lectus ac cursus vitae diam faucibus placerat fusce nisl, lorem.
              Sapien ullamcorper in id vitae rhoncus, turpis pellentesque neque
              blandit.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',

                marginBottom: 20,
              }}>
              Lectus ac cursus vitae diam faucibus placerat fusce nisl, lorem.
              Sapien ullamcorper in id vitae rhoncus, turpis pellentesque neque
              blandit.
            </Text>
          </View>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Terms;

const styles = StyleSheet.create({});
