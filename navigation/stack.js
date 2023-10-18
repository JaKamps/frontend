import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QRCodeComponent from '../components/qr/qrgenerator';
import MainScreen from '../screens/MainScreen';
import LobbyScreen from '../screens/LobbyScreen';
import JoinScreen from '../screens/JoinScreen';
import TasksScreen from '../screens/TasksScreen';
import UpdatingScreen from '../screens/gamescreens/updatescreen';
import NumbersScreen from '../screens/gamescreens/NumbersScreen';
import SimonSaysScreen from '../screens/gamescreens/SimonSaysScreen';
import SideMenu from '../components/sidemenu';
import EmployeeStartScreen from '../screens/startendscreens/EmployeeStartScreen';
import ImposterStartScreen from '../screens/startendscreens/ImposterStartScreen';
import ImposterWinScreen from '../screens/startendscreens/ImposterWinScreen';
import EmployeeWinScreen from '../screens/startendscreens/EmployeeWinScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ImposterMenuScreen from '../screens/ImposterMenuScreen';
import MeetingScreen from '../screens/MeetingScreen';
import JammerScreen from '../screens/gamescreens/JammerScreen';

const Stack = createStackNavigator();

export const MainScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Lobby"
        component={LobbyScreen}
        options={({ headerShown: true })}
      />
      <Stack.Screen
        name="Join"
        component={JoinScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="QRCodeAlert"
        component={QRCodeComponent}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Meeting"
        component={MeetingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tasks"
        component={TasksScreen}
        options={{ headerShown: false }}

      />
      <Stack.Screen
        name="Updating"
        component={UpdatingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Numbers"
        component={NumbersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SimonSays"
        component={SimonSaysScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Jammer"
        component={JammerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SideMenu"
        component={SideMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmployeeStart"
        component={EmployeeStartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ImposterStart"
        component={ImposterStartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ImposterWin"
        component={ImposterWinScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmployeeWin"
        component={EmployeeWinScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ImposterMenu"
        component={ImposterMenuScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
