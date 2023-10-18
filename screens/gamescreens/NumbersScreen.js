import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, SafeAreaView } from "react-native";
import axios from "axios";
import PlayerContext from '../../context/playerContext';


const NumbersScreen = ({ route }) => {
    const numbers_combination = Array.from({ length: 10 }, (_, index) => index + 1);
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffleArray(numbers_combination);
    const { playerData } = useContext(PlayerContext);
    const Navigation = useNavigation();
    let task = route.params


    const params = JSON.stringify({
        "task": task,
        "player": playerData.player,

    });


    const TaskUploadingComplete = () => {
        axios.post(global.TTTIP + '/games/' + playerData.game.title + '/task_update_complete/', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {

                if (response.data["win"] === "employees win") {
                    Navigation.navigate('EmployeeWin');
                } else {
                    Navigation.navigate('Tasks');
                }
            }
            )
            .catch((error) => {
                Alert.alert('Error', 'Failed to start the task');
                console.log(error);
            });
    }


    const [prevValue, setPrevValue] = useState(0);

    function checkTask(chosenNumber) {
        console.log(chosenNumber);
        if (chosenNumber === prevValue + 1 && chosenNumber === 10) {
            TaskUploadingComplete();
        } else if (chosenNumber === prevValue + 1) {
            setPrevValue(chosenNumber);
        } else {
            alert("you pressed the wrong button try again");
            // Reset the previous value
            setPrevValue(0);
        }
    }

    if (task.task.status === 0) {
        return (
            <ImageBackground source={global.IMAGE} resizeMode="cover" style={styles.image}>
                <SafeAreaView style={styles.screen}>
                    <View style={styles.TaskCard}>
                        <Text style={styles.text}>Location: {task.task.location_name}</Text>
                        <View style={styles.list}>
                            <TouchableOpacity style={styles.numberbox} onPress={() => checkTask(numbers_combination[0])}>
                                <Text style={styles.number}>{numbers_combination[0]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numberbox} onPress={() => checkTask(numbers_combination[1])} >
                                <Text style={styles.number}>{numbers_combination[1]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numberbox} onPress={() => checkTask(numbers_combination[2])}>
                                <Text style={styles.number}>{numbers_combination[2]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numberbox} onPress={() => checkTask(numbers_combination[3])}>
                                <Text style={styles.number}>{numbers_combination[3]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numberbox} onPress={() => checkTask(numbers_combination[4])}>
                                <Text style={styles.number}>{numbers_combination[4]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numberbox} onPress={() => checkTask(numbers_combination[5])}>
                                <Text style={styles.number}>{numbers_combination[5]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numberbox} onPress={() => checkTask(numbers_combination[6])}>
                                <Text style={styles.number}>{numbers_combination[6]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numberbox} onPress={() => checkTask(numbers_combination[7])}>
                                <Text style={styles.number}>{numbers_combination[7]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numberbox} onPress={() => checkTask(numbers_combination[8])}>
                                <Text style={styles.number}>{numbers_combination[8]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numberbox} onPress={() => checkTask(numbers_combination[9])}>
                                <Text style={styles.number}>{numbers_combination[9]}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={styles.bottommenu}>
                        <TouchableOpacity style={styles.closebtn} onPress={() => { Navigation.navigate('Tasks') }}>
                            <Text style={styles.closebtntxt}>close</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>

        );
    } else if (task.task.status === 3) {
        return (
            <ImageBackground source={global.IMAGE} resizeMode="cover" style={styles.image}>
                <SafeAreaView style={styles.screen}>
                    <View style={styles.TaskCard}>
                        <Text style={styles.text}>Location: {task.task.location_name}</Text>
                        <View style={styles.completelist}>
                            <Text style={styles.complete}>You have completed this task</Text>
                        </View>

                    </View>
                    <View style={styles.bottommenu}>
                        <TouchableOpacity style={styles.closebtn} onPress={() => { Navigation.navigate('Tasks') }}>
                            <Text style={styles.closebtntxt}>close</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    },
    text: {
        color: "black",
        fontSize: 20,
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: 'rgba(0, 217, 0, 0.1)',
        height: '80%',
    },
    bottommenu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    closebtn: {
        backgroundColor: 'red',
        borderRadius: 50,
        padding: 10,
        marginHorizontal: 10,
        width: 120,
        alignContent: 'center',
    },
    closebtntxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    TaskCard: {
        flex: 1,
        backgroundColor: 'brown',
        alignContent: 'center',
        padding: 20,
        elevation: 5,
        width: '100%',
        height: '90%',
        marginBottom: 20,
    },
    number: {
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',

    },
    numberbox: {
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 25,
        margin: 10,
        width: '30%',
        height: "15%",
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    complete: {
        color: 'white',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
    },
    completelist: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        height: '80%',
    },
});


export default NumbersScreen;