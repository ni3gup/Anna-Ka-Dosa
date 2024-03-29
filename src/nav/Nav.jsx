import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNav from './AuthNav';
import Mainnav from './MainnavTab';
import {clearAsyncStorage, getData, storeData} from '../utils/AsyncStorag';
import Main from './Main';
import {useLogin} from '../utils/LoginproviderContext';
import NavigationService from './Navigation/NavigationService';
import {notificationListeners} from '../utils/notificationService';

const Nav = () => {
  const {isLoggedin, setIsLoggedin} = useLogin();
  //ebuXDP1MQLCeiOW0Fv5Huv:APA91bGiJXU65laQVEDLL3tE4yt7fuLxb_WTJKNVoZUr4V-UWZf0PmszXswPVlmV-ZAGBPDEiMfkjPopALwTdS9xTlzaMAs6jQTO0OIYSysY6-jeNIS4VqKfxdL5DR1PWU9SEm0fjb4k
  //AAAAs0jTPBU:APA91bGft03RZLJeDRv8nXem1z2hSLXDXCEFAcD1o09Pyw5L3YZYFGEoMB1JwCF1IcOnBBlf5CigSPeBMxNL9Kocfx3R7mpSkccsCdBVitPFGJdo6DxvcZS2Jze5uQ58-3kgC0g-RzO0
  useEffect(() => {
    fetchData();
  }, [setIsLoggedin]);
  notificationListeners();
  const fetchData = async () => {
    const id = await getData('id');

    if (id) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  };
  return (
    <NavigationContainer
      ref={ref => NavigationService.setTopLevelNavigator(ref)}>
      {isLoggedin ? <Main /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default Nav;

const styles = StyleSheet.create({});
