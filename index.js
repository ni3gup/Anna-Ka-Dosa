/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import NavigationService from './src/nav/Navigation/NavigationService';
import {getData, storeData} from './src/utils/AsyncStorag';
// import {Appearance} from 'react-native';
// // Enforce light mode (not recommended for production)
// Appearance.getColorScheme = 'light';

messaging()
  .getInitialNotification()
  .then(async remoteMessage => {
    try {
      console.log('Message in initail notification', remoteMessage);
      const id = await getData('id');
      // if (id !== null) {
      //   setTimeout(() => {
      //     NavigationService.navigate('Notifications');
      //   }, 2500);
      // }
    } catch (error) {
      console.error('Error getting initial notification:', error);
    }
  });
messaging().setBackgroundMessageHandler(async remoteMessage => {
  try {
    console.log('Message handled in the background!', remoteMessage);
    const id = await getData('id');
    const loggedin = await getData('loggedin');
    if (id !== null) {
      setTimeout(() => {
        NavigationService.navigate('Notifications');
      }, 3000);
    }
  } catch (error) {
    console.error('Error handling background message:', error);
  }
});

AppRegistry.registerComponent(appName, () => App);
