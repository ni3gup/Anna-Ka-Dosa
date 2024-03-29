import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const Rateus = ({navigation}) => {
  const [defaultrating, setdefaultrating] = useState(1);
  const [starmp, setstarmp] = useState([1, 2, 3, 4, 5]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
            //sfontWeight: 'bold',
            color: 'black',
            marginLeft: 20,
            textAlignVertical: 'center',
          }}>
          Rate Us
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{margin: 20}}>
        <TouchableOpacity>
          <Image
            source={require('../assets/iconsassets/rate-usgif.gif')}
            style={{height: 200, width: '100%', marginBottom: 90}}
          />
        </TouchableOpacity>

        {/* <View style={{alignSelf: 'center', marginTop: 110}}>
          <Text style={{fontSize: 15}}>Rate your delivery by</Text>
        </View> */}
        <View style={{alignSelf: 'center', marginVertical: 10}}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
            Rate us
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
          }}>
          {starmp.map((item, key) => (
            <TouchableOpacity
              //activeOpacity={}
              key={item}
              onPress={() => setdefaultrating(item)}>
              <Image
                source={
                  item <= defaultrating
                    ? require('../assets/iconsassets/rate-usy.png')
                    : require('../assets/iconsassets/rate-usb.png')
                }
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{marginVertical: 25}}>
          <Text style={{textAlign: 'center', fontSize: 15}}>
            Your word makes Anna Ka Dosa a better place.You are the influencer.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Rateus;

const styles = StyleSheet.create({});
