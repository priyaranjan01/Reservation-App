import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../components/Dashboard/Home';
import ProductList from '../components/Dashboard/List';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: '#1369a3'},
        }}>
        <Tab.Screen
          name="Dashboard"
          component={HomeStack}
          options={() => ({
            headerShown: false,
            tabBarActiveTintColor: '#222',
            tabBarInactiveTintColor: '#aaa',
            tabBarIcon: ({tintColor, focused}) =>
              getTabBarIcon(require('assets/tab/dashboard.png'), focused),
          })}
        />
        <Tab.Screen
          name="Customer"
          component={SettingsScreen}
          options={({route}) => ({
            tabBarActiveTintColor: '#222',
            tabBarInactiveTintColor: '#aaa',
            tabBarIcon: ({tintColor, focused}) =>
              getTabBarIcon(require('assets/tab/customer.png'), focused),
          })}
        />
        <Tab.Screen
          name="Reservation"
          component={SettingsScreen}
          options={({route}) => ({
            tabBarActiveTintColor: '#222',
            tabBarInactiveTintColor: '#aaa',
            tabBarIcon: ({tintColor, focused}) =>
              getTabBarIcon(require('assets/tab/reservation.png'), focused),
          })}
        />
        <Tab.Screen
          name="Agreement"
          component={SettingsScreen}
          options={({route}) => ({
            tabBarActiveTintColor: '#222',
            tabBarInactiveTintColor: '#aaa',
            tabBarIcon: ({tintColor, focused}) =>
              getTabBarIcon(require('assets/tab/agreement.png'), focused),
          })}
        />
        <Tab.Screen
          name="VehicleStatus"
          component={SettingsScreen}
          options={({route}) => ({
            tabBarActiveTintColor: '#222',
            tabBarInactiveTintColor: '#aaa',
            tabBarIcon: ({tintColor, focused}) =>
              getTabBarIcon(require('assets/tab/vehicle-status.png'), focused),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: {backgroundColor: '#1369a3'},
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Dashboard'}}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function SettingsScreen() {
  return <View />;
}

const getTabBarIcon = (c, focused) => (
  <Image
    source={c}
    // eslint-disable-next-line react-native/no-inline-styles
    style={[styles.tabIcon, {tintColor: focused ? '#1369a3' : '#5a5a5a'}]}
  />
);

const styles = StyleSheet.create({
  tabIcon: {
    height: 25,
    width: 25,
    marginTop: 5,
    resizeMode: 'contain',
  },
});
