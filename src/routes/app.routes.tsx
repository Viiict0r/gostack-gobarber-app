import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';

const AppNavigator = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppNavigator.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <AppNavigator.Screen name="Dashboard" component={Dashboard} />
  </AppNavigator.Navigator>
);

export default AppRoutes;
