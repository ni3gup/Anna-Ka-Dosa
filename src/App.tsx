/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Nav from './nav/Nav';
import LoginProvider, {useLogin} from './utils/LoginproviderContext';
import {notificationListeners} from './utils/notificationService';

function App() {
  return (
    <>
      <LoginProvider>
        <Nav />
      </LoginProvider>

      <SafeAreaView />
      {/* <StatusBar backgroundColor={'#fed920'} hidden /> */}
    </>
  );
}

const styles = StyleSheet.create({});

export default App;
