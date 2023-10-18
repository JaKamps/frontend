import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";


const TaskItem = ({ task }) => {
    const Navigation = useNavigation();
    const status = (task.status === 0) ? "Not Started" : (task.status === 1) ? "In Progress" : (task.status === 2) ? "waiting for input" : (task.status === 3) ? "Completed" : "Error";
    let task_name
    // Temporary till QR code is implemented
    const navigate_task = () => {
        if (task.task_name === "Updating") {
            Navigation.navigate("Updating", { task });
        } else if (task.task_name === "Numbers") {
            Navigation.navigate("Numbers", { task });
        } else if (task.task_name === "SimonSays") {
            Navigation.navigate("SimonSays", { task });
        }
    }
    return (
        <TouchableOpacity onPress={navigate_task}>
            <View style={styles.card}>
                <Text style={styles.text}>{task.task_name}</Text>
                <Text style={styles.text}>{task.location_name}</Text>
                <Text style={styles.text}>{status}</Text>
            </View>
        </TouchableOpacity>
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
        alignItems: "center",
    },
    text: {
        height: 32,
        color: "white",
        marginRight: 20,
    },
    icon: {
        height: 32,
        justifySelf: 'flex-end',
    },
});

export default TaskItem;