import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/MainScreen/Home';
import Offeritem from '../screens/MainScreen/Offeritem';
import Menu from '../screens/MainScreen/Menu';
import Notifications from '../screens/MainScreen/Notifications';
import Cart from '../screens/MainScreen/Cart';
const Tab = createBottomTabNavigator();
const Mainnav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          elevation: 25,
          // shadowColor: 'gray', // Shadow color (Android)
          // shadowOffset: {width: 10, height: 10}, // Shadow offset (Android)
          // shadowOpacity: 1, // Shadow opacity (Android)
          // shadowRadius: 10, // Shadow radius (Android)
          //   borderTopRightRadius: 25,
          //   borderTopLeftRadius: 25,
          height: '7%',

          backgroundColor: 'white',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          //   tabBarLabelStyle: {
          //     //     color: 'white',
          //     //     fontWeight: 'bold',
          //     //      fontSize: 11,
          //     //    marginBottom: 15,
          //     //     fontFamily: 'Arial',
          //   },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{marginBottom: 0}}>
              <Image
                // source={Evnt} // Update the file extension if needed
                source={require('../assets/iconsassets/home.png')}
                style={{
                  height: 25,
                  width: 25,
                  // marginBottom: focused ? 10 : 0,
                  tintColor: focused ? 'red' : null, // Set the color to white
                }} // Adjust the height and width as needed
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Offeritem"
        component={Offeritem}
        options={{
          //tabBarLabel: 'Home',

          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{marginBottom: 0}}>
              <Image
                // source={Evnt} // Update the file extension if needed
                source={require('../assets/iconsassets/offer-icon.png')}
                style={{
                  height: 24,
                  width: 24,
                  //  marginBottom: focused ? 10 : 0,
                  tintColor: focused ? 'red' : null, // Set the color to white
                }} // Adjust the height and width as needed
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          //tabBarLabel: 'Home',

          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  width: 70,
                  height: focused ? 70 : 0,
                  borderRadius: 40, // Outer circle
                  backgroundColor: focused ? 'red' : 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: focused ? 50 : 0,
                }}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30, // Inner circle
                    //backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/iconsassets/Menu-screen.png')}
                    style={{
                      height: 25,
                      width: 25,
                      tintColor: focused ? 'white' : 'green',
                    }}
                  />
                </View>
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          // tabBarLabel: 'Home',

          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{marginBottom: 0}}>
              <Image
                // source={Evnt} // Update the file extension if needed
                source={require('../assets/iconsassets/notification.png')}
                style={{
                  height: 27,
                  width: 27,
                  //  marginBottom: focused ? 10 : 0,
                  tintColor: focused ? 'red' : null, // Set the color to white
                }} // Adjust the height and width as needed
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          //tabBarLabel: 'Home',

          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{marginBottom: 0}}>
              <Image
                // source={Evnt} // Update the file extension if needed
                source={require('../assets/iconsassets/cart.png')}
                style={{
                  height: 25,
                  width: 25,
                  // marginBottom: focused ? 10 : 0,
                  tintColor: focused ? 'red' : null, // Set the color to white
                }} // Adjust the height and width as needed
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Mainnav;

const styles = StyleSheet.create({});
