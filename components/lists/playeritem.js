import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";


const PlayerItem = ({ gameTitle, player }) => {
  const LeaveLobby = () => {
    axios.post(global.TTTIP + '/games/' + gameTitle + '/leave_lobby/', { player_id: player.id })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to leave the lobby');
        console.log(error);
      });
  }
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{player.display_name}</Text>
      <TouchableOpacity style={styles.icon}
        onPress={() => {
          Alert.alert('Kick', 'Are you sure you want to kick ' + player.display_name + ' out of the lobby?', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'OK', onPress: () => LeaveLobby() },
          ]);

        }}
      >
        <Ionicons name="close" size={20} color="red" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 50,
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'rgba(217, 217, 217, 0.1)',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    height: 32,
    color: "white",
  },
  icon: {
    height: 32,
    justifySelf: 'flex-end',
  },
});

export default PlayerItem;