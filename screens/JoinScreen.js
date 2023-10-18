import { SafeAreaView, StyleSheet, Text, ImageBackground, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import PlayerContext from '../context/playerContext';
import UserContext from '../context/userContext';


const JoinScreen = () => {
  const { updatePlayerData } = useContext(PlayerContext);
  const { userData } = useContext(UserContext);
  const Navigation = useNavigation();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const params = JSON.stringify({
    "account": userData.user_id,
  });

  const JoinLobby = () => {
    console.log(userData);
    axios.post(global.TTTIP + '/games/' + inputValue + '/join_lobby/', params, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        updatePlayerData(response.data); // Store player data in context
        Navigation.navigate('Lobby', { game: response.data.game });
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to join the lobby');
        console.log(error);
      });
  };

  return (
    <ImageBackground source={global.IMAGE} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Enter Code</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange}
          value={inputValue}
          placeholder="Type something..."
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={JoinLobby}
        >
          <Text style={styles.text}>join lobby</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  header: {
    alignSelf: 'center',
    fontSize: 32,
    color: "white",
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    backgroundColor: "white",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  buttonContainer: {
    width: 200,
    height: 50,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#1400FF",
    borderRadius: 50,
    padding: 10,
    margin: 25,
  },

});
export default JoinScreen;
