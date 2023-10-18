import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Alert, ImageBackground, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import UserContext from '../context/userContext';

const MainScreen = () => {
  const Navigation = useNavigation();
  const [showChangeName, setShowChangeName] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { userData } = useContext(UserContext);

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const GameMaster = () => {
    axios.post(global.TTTIP + '/games/' + gametitle + '/gamemaster/', params, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log(response.data);
        Navigation.navigate('Lobby', { game: game_data });

      })
      .catch((error) => {
        Alert.alert('Error', 'Fail to join the Lobby');
        console.log(error);
      });
  }

  const createLobby = () => {
    axios.post(global.TTTIP + '/games/')
      .then((response) => {
        console.log(response.data);
        params = JSON.stringify({
          "account": userData.user_id,
          "game": response.data,
        });
        gametitle = response.data.title;
        game_data = response.data;
        GameMaster();

      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to create lobby');
        console.log(error);
      });
  }

  params = JSON.stringify({
    "new_name": inputValue,
  });

  const changeName = () => {
    axios.post(global.TTTIP + '/users/' + userData.user_id + '/change_name/', params, {
      headers: { 'Content-Type': 'application/json' },
    }
    )
      .then((response) => {
        console.log(response.data);
        setShowChangeName(false);
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to change name');
        console.log(error);
      });
  }

  return (
    <ImageBackground source={global.IMAGE} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.screen}>

        <Text style={styles.titleText}>MMC TTT Nerf</Text>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => Navigation.navigate('Join')}
          >
            <Text style={styles.text}>Join Lobby</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={createLobby}
          >
            <Text style={styles.text}>create Lobby</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottommenu}>
          <TouchableOpacity onPress={() => setShowChangeName(true)}>
            <Ionicons name="cog" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {showChangeName && (
        <TouchableOpacity
          style={styles.alertBackground}
          onPress={() => setShowChangeName(false)}
        >
          <View style={styles.alertContent}>
            <Text style={styles.header}>Change your display name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleInputChange}
              value={inputValue}
              maxLength={20}
              placeholder="Marco"
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={changeName}
            >
              <Text style={styles.text}>Change display name</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </ImageBackground>



  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    flex: 1,
    justifyContent: 'stretch',
    alignItems: 'center',

  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  buttonContainer: {
    width: 200,
    height: 50,
    alignItems: "center",
    backgroundColor: "#1400FF",
    borderRadius: 50,
    padding: 10,
    margin: 25,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 50,
    color: 'white',
    textShadowColor: 'red',   // Color of the shadow
    textShadowOffset: {         // Offset of the shadow (horizontal and vertical)
      width: 2,
      height: 2,
    },
    textShadowRadius: 2,        // Radius of the shadow
  },
  bottommenu: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 20,
  },
  header: {
    alignSelf: 'center',
    fontSize: 32,
    color: "white",
  },
  input: {
    padding: 10,
    height: 40,
    margin: 12,
    minWidth: 200,
    borderWidth: 1,
    backgroundColor: "white",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  alertContent: {
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  alertBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

export default MainScreen;
