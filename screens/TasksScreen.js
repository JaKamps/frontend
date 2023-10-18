import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, ImageBackground, View, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import TaskItem from '../components/lists/tasktitem';
import PlayerContext from '../context/playerContext';
import SideMenu from '../components/sidemenu';

const TasksScreen = ({ }) => {

    let { playerData } = useContext(PlayerContext);
    const [IsDead, setIsDead] = useState(playerData.is_dead);
    const Navigation = useNavigation();
    const [playerTasks, setPlayerTasks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [showSideMenu, setShowSideMenu] = useState(false);




    const params = JSON.stringify({
        "player_id": playerData,
    });
    const dead = JSON.stringify({
        "player": playerData,
    });

    useEffect(() => {
        LoadTasks();
    }, []);

    const LoadTasks = () => {
        axios.post(global.TTTIP + '/games/' + playerData.game.title + '/get_player_data/', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                setPlayerTasks(response.data);

            })
            .catch((error) => {
                Alert.alert('Error', 'Failed to get tasks');
                console.log(error);
            });
    }

    const SelfDead = () => {
        axios.post(global.TTTIP + '/games/' + playerData.game.title + '/player_dead/', dead, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                playerData = response.data;
                setIsDead(true);
                console.log(response.data);
                alert("You're dead please be quiet and continue your tasks");
                if (response.data["win"] === "imposters win") {
                    Navigation.navigate('ImposterWin');
                } else if (response.data["win"] === "employees win") {
                    Navigation.navigate('EmployeeWin');
                }
            }
            )
            .catch((error) => {
                Alert.alert('Error', 'Failed to die');
                console.log(error);
            });
    }



    const handleRefresh = () => {
        setRefreshing(true);
        LoadTasks();
        setRefreshing(false);
    }

    return (
        <ImageBackground source={global.IMAGE} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={styles.screen}>
                <Text style={styles.text}>Tasks</Text>
                <Text style={styles.text}>percentage of tasks completed</Text>
                <Progress.Bar progress={playerTasks.tasks_percentage} width={200} />
                <FlatList
                    style={styles.list}
                    data={playerTasks.player}
                    keyExtractor={item => item.task}
                    renderItem={({ item }) => (<TaskItem task={item} />)}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />

                <View style={styles.bottommenu}>
                    <TouchableOpacity onPress={() => { Alert.alert("You're going to murder someone."); }}>
                        <Ionicons name="warning" size={40} color="red" />
                    </TouchableOpacity>
                    {IsDead === false && <TouchableOpacity style={styles.deadbtn} onPress={SelfDead}>
                        <Text style={styles.deadbtntxt}>DEAD</Text>
                    </TouchableOpacity>}
                    {IsDead === true && <TouchableOpacity style={styles.isdeadbtn} onPress={SelfDead}>
                        <Text style={styles.isdeadbtntxt}>DEAD</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={() => setShowSideMenu(true)}>
                        <Ionicons name="list" size={40} color="white" />
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
            {showSideMenu && (
                <TouchableOpacity
                    style={styles.sidemenu}
                    onPress={() => setShowSideMenu(false)}
                >
                    <View style={styles.alertContent}>
                        <SideMenu round={playerData.round} />
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    },
    text: {
        color: "white",
        fontSize: 20,
    },
    list: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: 'rgba(217, 217, 217, 0.1)',
        width: '100%',
    },
    bottommenu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    deadbtn: {
        backgroundColor: 'red',
        borderRadius: 50,
        padding: 10,
        marginHorizontal: 10,
        width: 100,
        alignContent: 'center',
    },
    deadbtntxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    sidemenu: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    alertContent: {
        backgroundColor: 'black',
        elevation: 5,
    },
    isdeadbtn: {
        backgroundColor: 'grey',
        borderRadius: 50,
        padding: 10,
        marginHorizontal: 10,
        width: 100,
        alignContent: 'center',
    },
    isdeadbtntxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },

});

export default TasksScreen;
