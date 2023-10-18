import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import PlayerContext from '../context/playerContext';
import SideMenu from '../components/sidemenu';




const ImposterMenuScreen = ({ navigation }) => {
    let { playerData } = useContext(PlayerContext);
    const [playerTasks, setPlayerTasks] = useState([]);
    const Navigation = useNavigation();
    const [showSideMenu, setShowSideMenu] = useState(false);
    const [IsDead, setIsDead] = useState(playerData.is_dead);
    const dead = JSON.stringify({
        "player": playerData,
    });
    const params = JSON.stringify({
        "data": playerData,
    });

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
    const sabotageJammer = () => {
        axios.post(global.TTTIP + '/games/' + playerData.game.title + '/sabotage_jammer/', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.data["sabotage"] === false) {
                    Alert.alert('Error', "you've already sabotaged the jammer");
                    return;
                } else if (response.data["sabotage"] === true) {
                    console.log(response.data);
                    Navigation.navigate('Tasks');
                } else {
                    console.log("something went wrong")
                    console.log(response.data);
                }
            })
            .catch((error) => {
                Alert.alert('Error', 'Failed to sabotage');
                console.log(error);
            });
    }



    return (
        <ImageBackground source={global.IMAGE} resizeMode="cover" style={styles.image} >
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Sabotage</Text>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.status}>
                            <Text style={styles.statusText}>jammer status</Text>
                        </View>
                        <TouchableOpacity style={styles.touch} onPress={() => { sabotageJammer() }} >
                            <Text style={styles.statusText}>Sabotage</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.status}>
                            <Text style={styles.statusText}>Reactor</Text>
                        </View>
                        <TouchableOpacity style={styles.touch} onPress={() => { Alert.alert("This turns off the reactor"); }} >
                            <Text style={styles.statusText}>Sabotage</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
                        <SideMenu />
                    </View>
                </TouchableOpacity>
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: null,
        height: null,
    },
    container: {
        flex: 1,
        height: '90%',
        marginTop: 20,
        marginBottom: 20,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',


    },
    item: {
        alignContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 32,
        color: "white",
        fontWeight: "bold",
    },
    status: {
        width: "50%",
        minWidth: "50%",
        backgroundColor: 'rgba(217, 217, 217, 0.1)',
        height: 50,
        alignContent: 'center',
        alignItems: 'center',
        margin: 10,

    },
    statusText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',

    },
    touch: {
        backgroundColor: 'red',
        borderRadius: 50,
        padding: 10,
        marginHorizontal: 10,
        width: "50%",
        alignContent: 'center',
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
export default ImposterMenuScreen;


