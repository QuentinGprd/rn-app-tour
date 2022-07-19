import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import AppTour from 'rn-app-tour/lib/src/AppTour';
import HomeScreen from './Screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Example" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <AppTour />
    </SafeAreaView>
  );
};

export default App;
