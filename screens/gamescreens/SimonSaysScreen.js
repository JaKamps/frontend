import React, { useState, useContext, useEffect } from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, SafeAreaView } from "react-native";
import PlayerContext from '../../context/playerContext';
import axios from "axios";


const SimonsSaysScreen = ({ route }) => {
    const { playerData } = useContext(PlayerContext);
    const Navigation = useNavigation();
    let task = route.params;

    const [sequence, setSequence] = useState([]);
    const [playerInput, setPlayerInput] = useState([]);
    const [gameState, setGameState] = useState("waitingForStart");
    const [completedRounds, setCompletedRounds] = useState(0);

    const [rBlockstyle, setrBlockstyle] = useState(styles.rblock);
    const [gBlockstyle, setgBlockstyle] = useState(styles.gblock);
    const [bBlockstyle, setbBlockstyle] = useState(styles.bblock);
    const [yBlockstyle, setyBlockstyle] = useState(styles.yblock);



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




    useEffect(() => {
        if (gameState === "waitingForStart") {
            setSequence([]);
            startNewRound();
        }
    }, [gameState]);

    const lightUpSequence = async () => {
        setGameState("showingSequence");

        for (let i = 0; i < sequence.length; i++) {
            const step = sequence[i];


            switch (step) {
                case 0:
                    setrBlockstyle(styles.lighterBlock);
                    break;
                case 1:
                    setgBlockstyle(styles.lighterBlock);
                    break;
                case 2:
                    setbBlockstyle(styles.lighterBlock);
                    break;
                case 3:
                    setyBlockstyle(styles.lighterBlock);
                    break;
                default:
                    break;
            }

            await new Promise((resolve) => setTimeout(resolve, 1000));

            setrBlockstyle(styles.rblock);
            setgBlockstyle(styles.gblock);
            setbBlockstyle(styles.bblock);
            setyBlockstyle(styles.yblock);

            await new Promise((resolve) => setTimeout(resolve, 500));
        }

        setGameState("waitingForInput");
    };
    const handleTouchablePress = (touchableIndex) => {
        if (gameState === "waitingForInput") {
            const updatedPlayerInput = [...playerInput, touchableIndex];
            setPlayerInput(updatedPlayerInput);

            if (updatedPlayerInput.join(",") === sequence.slice(0, updatedPlayerInput.length).join(",")) {
                if (updatedPlayerInput.length === sequence.length) {
                    if (completedRounds === 4) {
                        TaskUploadingComplete();
                    } else {
                        startNewRound();
                        setCompletedRounds(completedRounds + 1);
                    }
                }
            } else {
                alert("You made a mistake! Game over.");
                resetGame();
            }
        }
    };

    const startNewRound = () => {
        const newStep = Math.floor(Math.random() * 4);

        // Update the sequence state
        setSequence((prevSequence) => [...prevSequence, newStep]);
    };

    // Use useEffect to trigger lightUpSequence after sequence has been updated
    useEffect(() => {
        if (sequence.length > 0) {
            setPlayerInput([]);
            lightUpSequence();
        }
    }, [sequence]);

    const resetGame = () => {
        setSequence([]);
        setPlayerInput([]);
        setCompletedRounds(0);
        setGameState("waitingForStart");
    };
    if (task.task.status === 0) {
        return (
            <ImageBackground source={global.IMAGE} resizeMode="cover" style={styles.image}>
                <SafeAreaView style={styles.screen}>
                    <View style={styles.TaskCard}>
                        <Text style={styles.text}>Location: {task.task.location_name}</Text>
                        <View style={styles.list}>
                            <TouchableOpacity style={rBlockstyle} onPress={() => handleTouchablePress(0)} />
                            <TouchableOpacity style={gBlockstyle} onPress={() => handleTouchablePress(1)} />
                            <TouchableOpacity style={bBlockstyle} onPress={() => handleTouchablePress(2)} />
                            <TouchableOpacity style={yBlockstyle} onPress={() => handleTouchablePress(3)} />
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
};
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
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
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
    gblock: {
        backgroundColor: 'green',
        margin: 5,
        width: "45%",
        height: "45%",
    },
    yblock: {
        backgroundColor: 'yellow',
        margin: 5,
        width: "45%",
        height: "45%",
    },
    bblock: {
        backgroundColor: 'blue',
        margin: 5,
        width: "45%",
        height: "45%",
    },
    rblock: {
        backgroundColor: 'red',
        margin: 5,
        width: "45%",
        height: "45%",
    },
    lighterBlock: {
        backgroundColor: 'white', // Replace 'lighter-color' with the actual color you want to use
        margin: 5,
        width: "45%",
        height: "45%",
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



export default SimonsSaysScreen;