import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import PlayerContext from '../context/playerContext';

const SideMenu = (round) => {
    const { playerData } = useContext(PlayerContext);
    const [playerTasks, setPlayerTasks] = useState([]);
    const Navigation = useNavigation();
    console.log(round)


    const Cal_meeting = () => {
        axios.post(global.TTTIP + '/games/' + playerData.game.title + '/call_meeting/', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.data["meeting_called"] === false) {
                    Navigation.navigate('Meeting', { round });
                } else if (response.data["meeting_called"] === true) {
                    console.log(response.data);
                    Alert.alert('Error', "you've already called a meeting");
                    return;
                } else {
                    console.log("something went wrong")
                    console.log(response.data);
                }
            })
            .catch((error) => {
                Alert.alert('Error', 'You where not able to call a meeting');
                console.log(error);
            });
    }



    const params = JSON.stringify({
        "player_id": playerData.player,
        "round": round,
    });
    const imposterpparams = JSON.stringify({
        "player": playerData,
    });

    useEffect(() => {
        console.log(playerData);
    }, []);

    const LoadTasks = () => {
        axios.post(global.TTTIP + '/games/' + playerData.game.title + '/get_player_data/', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                setPlayerTasks(response.data.player[0].location);
            })
            .catch((error) => {
                Alert.alert('Error', 'Failed to get tasks');
                console.log(error);
            });
    }

    const qrScanner = () => {
        // const params = JSON.stringify({
        //     "player": playerData.player,
        //     "task": playerTasks,
        // });
        // axios.post(global.TTTIP + '/games/' + playerData.game.title + '/task_scanner/', params, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        //     .then((response) => {
        //         if (response.data === "no task found") {
        //             Alert.alert('Error', 'No task found');
        //             return;
        //         } else {
        //             console.log('Scanned QR Code:');
        //             console.log(response.data);
        //             
        //         }
        //     })
        //     .catch((error) => {
        //         Alert.alert('Error', 'Failed to start the task');
        //         Navigation.navigate("Jammer");
        //         console.log(error);
        //     });
        Navigation.navigate("Jammer");
        console.log('Scanned QR Code:');
    }


    const imposter_check = () => {
        axios.post(global.TTTIP + '/games/' + playerData.game.title + '/imposter_check/', imposterpparams, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.data == "imposter") {

                    Navigation.navigate('ImposterMenu');
                } else {
                    console.log(response.data);
                    return;
                }
            })
            .catch((error) => {
                Alert.alert('Error', 'Failed to check if you are an imposter');
                console.log(error);
            });
    }

    return (

        <View style={styles.overlay}>
            <ImageBackground source={global.IMAGE} resizeMode="cover" style={styles.image} imageStyle=
                {{ opacity: 0.5 }} >
                <SafeAreaView>
                    <View style={styles.container}>

                        <TouchableOpacity style={styles.touch} onPress={() => { Alert.alert("this shows the players in the lobby"); }}>
                            <Ionicons name="person" size={40} color="white" />
                            <Text style={styles.text}>Player List</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch} onPress={() => { Navigation.navigate('Tasks') }}>
                            <Ionicons name="checkbox-outline" size={40} color="white" />
                            <Text style={styles.text}>Tasks</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch} onPress={() => { imposter_check() }}>
                            <Ionicons name="bug" size={40} color="white" />
                            <Text style={styles.text}>Imposters menu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch} onPress={() => { Cal_meeting() }}>
                            <Ionicons name="call" size={40} color="white" />
                            <Text style={styles.text}>Call meeting</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity onPress={qrScanner}>
                            <Ionicons name="qr-code-outline" size={40} color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
    },
    container: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: 'rgba(217, 217, 217, 0.1)',
        width: '90%',
        height: '85%',
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    },
    item: {
        flexDirection: 'row',
        height: "10%",
        marginVertical: 10,
        width: "100%",
        color: "white",
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'rgba(217, 217, 217, 0.1)',
    },
    text: {
        color: "white",
    },
    touch: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        alignItems: 'center',
        height: "10%",
        marginVertical: 10,
        width: "100%",
        color: "white",
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'rgba(217, 217, 217, 0.1)',
    }
});

export default SideMenu;
