import messaging from '@react-native-firebase/messaging';

import NavigationService from '../nav/Navigation/NavigationService';
import Snackbar from 'react-native-snackbar';
import {getData, storeData} from './AsyncStorag';
export async function notificationListeners() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);
    // if (!!remoteMessage?.data && remoteMessage?.data?.redirect == 'user') {
    //NavigationService.navigate('Notifications');
    const id = await getData('id');
    if (id !== null) {
      await storeData('loggedin', 'true');
    }
    const logged = await getData('loggedin');
    console.log(logged);
    if (id !== null) {
      setTimeout(() => {
        Snackbar.show({
          text: 'You have got a new notification🎂🍕🥐',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: 'yellow',
          textColor: 'black',
          marginBottom: 70,
          // action: {
          //   text: 'Press',
          //   textColor: 'green',
          //   onPress: () => {
          //     NavigationService.navigate('Notifications');
          //   },
          // },
        });
      }, 1000);
    }

    //  }
    // if (!!remoteMessage?.data && remoteMessage?.data?.redirect == 'vendor') {
    //   Snackbar.show({
    //     text: 'A new request was made',
    //     duration: Snackbar.LENGTH_LONG,
    //     backgroundColor: 'white',
    //     textColor: 'black',
    //     // action: {
    //     //   text: 'press',
    //     //   textColor: 'green',
    //     //   onPress: () => {
    //     //     NavigationService.navigate('Vendornav');
    //     //   },
    //     // },
    //   });
    // }
  });

  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
    const logged = await getData('loggedin');
    const id = await getData('id');
    if (id !== null) {
      setTimeout(() => {
        NavigationService.navigate('Notifications');
      }, 2000);
    }

    // if (!!remoteMessage?.data && remoteMessage?.data?.redirect == 'user') {
    // }
    // if (!!remoteMessage?.data && remoteMessage?.data?.redirect == 'vendor') {
    // }
  });
  // messaging()
  //   .getInitialNotification()
  //   .then(async remoteMessage => {
  //     try {
  //       console.log(
  //         'Message in opening from kill state notification',
  //         remoteMessage,
  //       );
  //       setTimeout(() => {
  //         NavigationService.navigate('Notifications');
  //       }, 2000);
  //       //  if (remoteMessage) {
  //       //     if (!!remoteMessage?.data && remoteMessage?.data?.redirect == 'user') {
  //       //       NavigationService.navigate('Usernav');
  //       //     }
  //       //     if (
  //       //       !!remoteMessage?.data &&
  //       //       remoteMessage?.data?.redirect == 'vendor'
  //       //     ) {
  //       //       NavigationService.navigate('Vendornav');
  //       //     }
  //       //   }
  //     } catch (error) {
  //       console.error('Error getting initial notification:', error);
  //     }
  //   });

  return unsubscribe;
}
