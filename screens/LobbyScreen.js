import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, ImageBackground, FlatList, View, RefreshControl, ScrollView, TouchableOpacity, Alert, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PlayerItem from '../components/lists/playeritem';
import QRCodeComponent from '../components/qr/qrgenerator';
import axios from "axios";
import PlayerContext from '../context/playerContext';

const LobbyScreen = ({ route, navigation }) => {
  const { playerData } = useContext(PlayerContext);
  const { updatePlayerData } = useContext(PlayerContext);
  let { game } = route.params;
  const [players, setPlayers] = useState([]);
  for (const element of game?.players) {
    element.title = game?.title;
  }
  const [showQRCode, setShowQRCode] = useState(false);

  const Navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    refresh();
  }, []);



  useEffect(() => {
    if (!game) return;
    navigation.setOptions({
      headerRight: () => {
        if (game?.title) {
          return (
            <TouchableOpacity onPress={() => setShowQRCode(true)}>
              <Ionicons name="qr-code-outline" size={24} color="black" style={{ marginRight: 10 }} />
            </TouchableOpacity>
          );
        } else {
          return null;
        }
      },
    });
    setPlayers(game?.players || []);
  }, [game]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refresh();
    setTimeout(() => {
      setRefreshing(false);

    }, 1000);
  }, []);

  const params = JSON.stringify({
    "player_id": game?.players,
  });
  const refresh = () => {
    axios.post(global.TTTIP + '/games/' + game?.title + '/refresh/', params, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        game = response.data;
        gameData = response.data;
        for (const element of gameData?.players) {
          element.title = game?.title;
        }
        setPlayers(gameData?.players || []);
        console.log(game);
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to refresh the lobby');
        console.log(error);
      });
  }

  const startlobby = () => {
    axios.post(global.TTTIP + '/games/' + game?.title + '/start_round/')
      .then((response) => {
        const data = playerData;
        const round = { "round": response.data.round };
        const combine = { ...data, ...round };
        updatePlayerData(combine)
        imposter_array = response.data.impostersid;
        if (imposter_array.includes(playerData.player)) {
          Navigation.navigate('ImposterStart', { round: response.data });
        } else {
          Navigation.navigate('EmployeeStart', { round: response.data });
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to start the game');
        console.log(error);
      });
  }


  return (
    <ImageBackground source={global.IMAGE} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.screen}>

        <Text style={{ color: "white" }}>{game?.title}</Text>
        <Text style={styles.header}>Lobby</Text>
        <Text style={styles.text}>Players:</Text>

        <FlatList
          style={styles.list}
          data={players}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (<PlayerItem player={item} gameTitle={game?.title} />)}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <TouchableOpacity
          style={styles.startGameButton}
          onPress={startlobby}

        >
          <Text style={styles.startGameText}>Start Game</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {showQRCode && (
        <TouchableOpacity
          style={styles.alertBackground}
          onPress={() => setShowQRCode(false)}
        >
          <View style={styles.alertContent}>
            <QRCodeComponent title={game?.title} />
          </View>
        </TouchableOpacity>
      )}

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
    color: "white",
    fontSize: 32,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: 'rgba(217, 217, 217, 0.1)',
    width: '100%',

  },
  alertBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  buttonContainer: {
    color: "white",
    position: 'absolute',
    bottom: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startGameButton: {
    width: 200,
    height: 50,
    alignItems: "center",
    backgroundColor: "#1400FF",
    borderRadius: 50,
    padding: 10,
    margin: 25,
  },
  startGameText: {
    color: "white",
    fontSize: 20,
  },
});

export default LobbyScreen;
