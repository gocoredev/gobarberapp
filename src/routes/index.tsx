/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
// import { Container } from './styles';

const Auth = createStackNavigator()
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

const AuthRoutes: React.FC = () => {
  return (
      <Auth.Navigator screenOptions={{
          headerShown: false,
          
          cardStyle: { backgroundColor: "#312e38" }
      }}

      
      >
            <Auth.Screen name="SignIn" component={SignIn} />
            <Auth.Screen name="SignUp" component={SignUp} />
      </Auth.Navigator>
  );
}

export default AuthRoutes;