import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const Loading = ({color}) => {
  return (
    <SafeAreaView>
      {color ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <ActivityIndicator size={60} color={'red'} />
          </View>
        </View>
      ) : (
        <ImageBackground
          source={require('../assets/introscreenassets/background.jpeg')}
          style={{
            width: '100%',
            height: '100%',

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <ActivityIndicator size={60} color="white" />
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({});
