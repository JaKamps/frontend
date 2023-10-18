import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { MainScreenStack } from './navigation/stack';
global.TTTIP = "http://192.168.178.77:8000";
global.IMAGE = require('./assets/background.jpg');
import React from 'react';
import PlayerProvider from './components/provider/playerprovider';
import UserPovider from './components/provider/userprovider';

const App = () => {
  return (
    <UserPovider>
      <PlayerProvider>
        <NavigationContainer>
          <MainScreenStack />
        </NavigationContainer>
      </PlayerProvider>
    </UserPovider>
  );
};

export default App;
