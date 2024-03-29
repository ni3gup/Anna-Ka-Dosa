import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SliderBox} from 'react-native-image-slider-box';
import {getData, storeData} from '../../utils/AsyncStorag';

const Intro = ({navigation}) => {
  const images = [
    require('../../assets/introscreenassets/Slide-1.png'),
    require('../../assets/introscreenassets/Slide-2.png'),
    require('../../assets/introscreenassets/Slide-3.png'),
  ];

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../assets/introscreenassets/introductionimage.png')}
        style={{position: 'relative', width: '100%', height: '100%'}}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#fed920',
          height: '35%',
          width: '100%',
          //   paddingVertical: 30,
          //paddingHorizontal: 30,
          //paddingBottom: 20,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            elevation: 10,
            position: 'absolute',
            alignSelf: 'center',
            top: -20, // Adjust the top position based on your preference
            // left: '35%', // Adjust the left position based on your preference
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 40,
            zIndex: 1,
          }}
          onPress={() => {
            // Handle button press here
            //console.log('Button Pressed!');

            navigation.replace('SignIn');
          }}>
          <Text style={{color: '#00a954', fontWeight: 'bold'}}>
            Lets Explore
          </Text>
        </TouchableOpacity>
        <View style={{padding: 50}}>
          <SliderBox
            images={images}
            sliderBoxHeight={'80%'}
            dotColor="#00a954"
            autoplay={true}
            //imageLoadingColor={'#00a954'}
            autoplayInterval={3000}
            //circleLoop={true}
            //resizeMode={'contain'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Intro;

const styles = StyleSheet.create({});
