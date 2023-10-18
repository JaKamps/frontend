import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { DUMMY_PROGRAMS } from "../../Data/dummyprograms";
import Updatingitem from "../../components/lists/updatingitem";
import * as Progress from 'react-native-progress';
import PlayerContext from '../../context/playerContext';




const UpdatingScreen = ({ route }) => {
    const { playerData } = useContext(PlayerContext);
    const Navigation = useNavigation();
    let task = route.params
    let status = task.task.status
    let progress = status === 0 ? 0 : status === 1 ? 0.5 : status === 2 ? 0.9 : 1;

    const params = JSON.stringify({
        "task": task,
        "player": playerData.player,

    });
    useEffect(() => {
        TaskRefresh();
    }, []);


    const TaskUploadingStart = () => {
        axios.post(global.TTTIP + '/games/' + playerData.game.title + '/task_update_start/', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                task.status = 1
                TaskRefresh();
            })
            .catch((error) => {
                Alert.alert('Error', 'Failed to start the task');
                console.log(error);
            });
    }

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
                    TaskRefresh();
                }

            }
            )
            .catch((error) => {
                Alert.alert('Error', 'Failed to start the task');
                console.log(error);
            });
    }

    const TaskRefresh = () => {
        axios.post(global.TTTIP + '/games/' + playerData.game.title + '/task_refresh/', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                task = response.data
                status = task.task.status
                progress = status === 0 ? 0 : status === 1 ? 0.5 : status === 2 ? 0.9 : 1;
                Navigation.navigate('Updating', task);

            }
            )
            .catch((error) => {
                Alert.alert('Error', 'Failed to start the task');
                console.log(error);
            });

    }

    return (
        <ImageBackground source={global.IMAGE} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={styles.screen}>
                <View style={styles.TaskCard}>
                    <Text style={styles.text}>Location: {task.task.location_name}</Text>
                    <View>
                        <FlatList
                            style={styles.list}
                            data={DUMMY_PROGRAMS}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (<Updatingitem status={status} program={item} />)}
                        />
                    </View>
                    <View style={styles.status}>
                        <Progress.Bar progress={progress} width={200} />
                        <TouchableOpacity style={styles.uploadbtn} onPress={() => { { status === 0 ? TaskUploadingStart() : status === 2 ? TaskUploadingComplete() : Navigation.navigate('Tasks'); } }}>
                            <Text style={styles.closebtntxt}>{status === 0 ? 'Update' : status === 1 ? 'Updating' : status === 2 ? 'complete' : 'completed'}</Text>
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
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: 'rgba(217, 217, 217, 0.1)',
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
        // alignItems: 'center',
        padding: 20,
        elevation: 5,
        width: '100%',
        height: '90%',
        marginBottom: 20,
    },
    uploadbtn: {
        backgroundColor: 'blue',
        borderRadius: 50,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        width: 120,
        alignContent: 'center',
    },
    status: {

        alignItems: 'center',

    },

});


export default UpdatingScreen;