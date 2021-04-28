import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import AppointmentCreated from '../pages/AppointmentCreated';
import CreateAppointment from '../pages/CreateAppointment';
import Profile from '../pages/Profile';

const AppNavigator = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppNavigator.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <AppNavigator.Screen name="Dashboard" component={Dashboard} />
    <AppNavigator.Screen
      name="AppointmentCreated"
      component={AppointmentCreated}
    />
    <AppNavigator.Screen
      name="CreateAppointment"
      component={CreateAppointment}
    />

    <AppNavigator.Screen name="Profile" component={Profile} />
  </AppNavigator.Navigator>
);

export default AppRoutes;
