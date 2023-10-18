import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
let vote_status = false

const voted = (playerData) => {
    vote_status = 1
}

const MeetinPlayerItem = ({ player, status, callback_vote }) => {
    const handleVotePress = () => {
        callback_vote(player.player); // Pass the player.id to the callback_vote function
    }

    return (
        <View style={styles.card}>
            <Text style={styles.text}>{player.display_name}</Text>
            {status === true && !vote_status && (
                <TouchableOpacity onPress={handleVotePress}>
                    <Ionicons name="checkmark-circle-outline" size={32} color="green" style={styles.icon} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 50,
        // flex: 1,
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

export default MeetinPlayerItem;