import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";


const Updatingitem = ({ status, program }) => {
    const statustext = (status === 0) ? "Update available" : (status === 1) ? "Updating" : "Completed";


    return (
        <View style={styles.card}>
            <Text style={styles.text}>{program.name} ||</Text>
            <Text style={styles.text}> {statustext}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 50,
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: 'rgba(217, 217, 217, 0.1)',
        flexDirection: "row",
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

export default Updatingitem;