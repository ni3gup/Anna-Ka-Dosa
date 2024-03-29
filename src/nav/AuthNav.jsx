import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro from '../screens/IntroAuthScreens/Intro';
import SignIn from '../screens/IntroAuthScreens/SignIn';
import Verify from '../screens/IntroAuthScreens/Verify';
import Signup from '../screens/IntroAuthScreens/Signup';
import Mainnav from './MainnavTab';
import SettingsStk from '../components/SettingsStk';
import Settings from '../components/SettingsStk';
import Profile from '../components/ProfileStk';
import ManageAddress from '../components/ManageAddStk';
import Address from '../components/AddressStk';
import Feedback from '../components/FeedbackStk';
import Orderhistory from '../components/OrderhistStk';
import RateyourorderStk from '../components/RateyourorderStk';
import Trackorder from '../components/TrackorderStx';
import Trackingorder from '../components/TrackingorderStk';
import OrderStatus from '../components/OrderstatusStk';
import Logout from '../components/LogoutStk';
import Aboutus from '../components/AboutusStk';
import About from '../components/AboutStk';
import Terms from '../components/T&C';
import Privacy from '../components/PrivacypolicyStk';
import OrderinghelpStk from '../components/OrderinghelpStk';
import Orderinghelp from '../components/OrderinghelpStk';
import Faqs from '../components/FaqsStk';
import Rateus from '../components/RateusStk';
import AddgiftcardStk from '../components/AddgiftcardStk';
import Addgiftcard from '../components/AddgiftcardStk';
import Annaoffer from '../components/AnnaofferStk';
import Paymentmethod from '../components/PaymentmethodStk';
import Securecheckout from '../components/SecurechkoutStk';
import Paymentcomplete from '../components/PaymentcompleteStk';
import Dosamenu from '../components/MenuprodcutsStk';
import Searchmenu from '../components/SearchmenuStk';
import Masaladosa from '../components/Productinfo';
import Cart from '../screens/MainScreen/Cart';
import Addaddress from '../components/AddaddressStk';
import Menuproducts from '../components/MenuprodcutsStk';
import Productinfo from '../components/Productinfo';
import {getData} from '../utils/AsyncStorag';
import Main from './Main';
const Stack = createNativeStackNavigator();
const AuthNav = () => {
  // const [id, setId] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const id = await getData('id');
  //     setId(id);
  //   };

  //   fetchData();
  // }, [id]);
  return (
    //change or conditionalise initial route  when someones login
    <Stack.Navigator //initialRouteName='Main'
    >
      {/* {id ? (
        <> */}
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Home"
        component={Main}
        options={{headerShown: false}}
      /> */}
      {/*
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ManageAddress"
        component={ManageAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderHistory"
        component={Orderhistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Rateorder"
        component={RateyourorderStk}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Trackorder"
        component={Trackorder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Trackingorder"
        component={Trackingorder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Orderstatus"
        component={OrderStatus}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Aboutus"
        component={Aboutus}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Privacypolicy"
        component={Privacy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Orderinghelp"
        component={Orderinghelp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Faqs"
        component={Faqs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Rateus"
        component={Rateus}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Addgiftcard"
        component={Addgiftcard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Annaoffer"
        component={Annaoffer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Paymentmethod"
        component={Paymentmethod}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Securecheckout"
        component={Securecheckout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Paymentcomplete"
        component={Paymentcomplete}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Menuproducts"
        component={Menuproducts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Searchmenu"
        component={Searchmenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Productinfo"
        component={Productinfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Addaddress"
        component={Addaddress}
        options={{headerShown: false}} */}
      {/* /> */}
      {/* </>
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={Mainnav}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ManageAddress"
            component={ManageAddress}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Address"
            component={Address}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Feedback"
            component={Feedback}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OrderHistory"
            component={Orderhistory}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Rateorder"
            component={RateyourorderStk}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Trackorder"
            component={Trackorder}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Trackingorder"
            component={Trackingorder}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Orderstatus"
            component={OrderStatus}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Logout"
            component={Logout}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Aboutus"
            component={Aboutus}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Terms"
            component={Terms}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Privacypolicy"
            component={Privacy}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Orderinghelp"
            component={Orderinghelp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Faqs"
            component={Faqs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Rateus"
            component={Rateus}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Addgiftcard"
            component={Addgiftcard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Annaoffer"
            component={Annaoffer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Paymentmethod"
            component={Paymentmethod}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Securecheckout"
            component={Securecheckout}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Paymentcomplete"
            component={Paymentcomplete}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Menuproducts"
            component={Menuproducts}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Searchmenu"
            component={Searchmenu}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Productinfo"
            component={Productinfo}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Addaddress"
            component={Addaddress}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Intro"
            component={Intro}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Verify"
            component={Verify}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
        </> */}
      {/* )} */}
    </Stack.Navigator>
  );
};

export default AuthNav;

const styles = StyleSheet.create({});
