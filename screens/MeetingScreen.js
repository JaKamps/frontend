import React, { useState, useEffect, useContext } from 'react';
import { playerData } from '../context/playerContext';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, ImageBackground, FlatList, View, RefreshControl, ScrollView, TouchableOpacity, Alert, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MeetinPlayerItem from '../components/lists/meetingplayeritem';
import QRCodeComponent from '../components/qr/qrgenerator';
import axios from "axios";
import PlayerContext from '../context/playerContext';
import CountdownTimer from '../components/provider/Timer';

const MeetingScreen = (route) => {
    const { playerData } = useContext(PlayerContext);
    const [players, setPlayers] = useState([]);
    const [started, setStarted] = useState(false);
    const Navigation = useNavigation();
    const [timer_state, setTimerState] = useState(0);
    const [vote_state, setVoteState] = useState(false);
    const [votingComplete, setVotingComplete] = useState(false);
    const params = JSON.stringify({
        "player_id": playerData,
    });

    useEffect(() => {
        load_players();
    }, []);


    async function performActions() {
        if (started == false) {
            setStarted(true);
            console.log("Waiting for 120 seconds...");
            await new Promise((resolve) => setTimeout(resolve, 60000));
            setTimerState(1);
            setVoteState(true);

            console.log("Waiting for another 60 seconds...");
            await new Promise((resolve) => setTimeout(resolve, 30000));
            console.log("Action 2 performed.");
            console.log("Voting is complete");
            votingDone();
        } else {
            throw new Error("the timer is already running");
        }
    }
    async function votingDone() {
        console.log("Waiting for 60 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        Navigation.navigate('Tasks');
    }

    performActions()
        .then(() => {
            console.log("All actions completed.");
        })
        .catch((error) => {
            console.error(error.message);
        });

    const handleVote = (playerId) => {
        console.log(playerId);
        setVoteState(false);
        const params = JSON.stringify({
            "playerdata": playerData,
            "vote": playerId,
        });

        axios.post(global.TTTIP + '/games/' + playerData.game.title + '/vote/', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log(response.data);
                setVotingComplete(true);
                if (response.data["win"] === "imposters win") {
                    Navigation.navigate('ImposterWin');
                } else if (response.data["win"] === "employees win") {
                    Navigation.navigate('EmployeeWin');
                }

            })
            .catch((error) => {
                Alert.alert('Error', 'Failed to vote');
                console.log(error);
            });
    }


    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        load_players();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const load_players = () => {
        axios.post(global.TTTIP + '/games/' + playerData.game.title + '/players/', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                setPlayers(response.data.players);
                console.log(response.data.players);
            })
            .catch((error) => {
                Alert.alert('Error', 'Failed to get players');
                console.log(error);
            });
    }



    return (
        <ImageBackground source={global.IMAGE} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={styles.screen}>

                <Text style={{ color: "white" }}></Text>
                <Text style={styles.header}>Lobby</Text>
                <Text style={styles.text}>Players:</Text>

                <FlatList
                    style={styles.list}
                    data={players}
                    keyExtractor={item => item.player}
                    renderItem={({ item }) => (<MeetinPlayerItem player={item} status={vote_state} callback_vote={handleVote} />)}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
                <View
                    style={styles.CountdownTimer}
                >

                    {timer_state == 0 && (<CountdownTimer initialTime={60} />)}
                    {timer_state == 1 && (<CountdownTimer initialTime={30} />)}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

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
    header: {
        color: "white",
        fontSize: 32,
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    list: {
        backgroundColor: 'rgba(217, 217, 217, 0.1)',
        width: '100%',

    },
    alertBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    buttonContainer: {
        color: "white",
        position: 'absolute',
        bottom: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    startGameButton: {
        width: 200,
        height: 50,
        alignItems: "center",
        backgroundColor: "#1400FF",
        borderRadius: 50,
        padding: 10,
        margin: 25,
    },
    startGameText: {
        color: "white",
        fontSize: 20,
    },
    CountdownTimer: {
        color: "white",
        backgroundColor: "#1400FF",
        borderRadius: 50,
        padding: 10,
        margin: 25,
    },

});

export default MeetingScreen;
