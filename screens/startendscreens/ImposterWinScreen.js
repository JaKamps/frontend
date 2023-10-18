import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView, Text, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlayerContext from '../../context/playerContext';

const ImposterWinScreen = ({ }) => {
    const { playerData } = useContext(PlayerContext);
    const navigation = useNavigation();
    let [winners, setWinners] = useState([]);
    console.log(playerData)

    const params = JSON.stringify({
        "game": playerData,
    });

    useEffect(() => {
        ImposterWinData();
        sendback();
    }, []);



    const ImposterWinData = () => {
        axios.post(global.TTTIP + '/games/' + playerData.game.title + '/imposter_win_data/', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log(response.data["imposters"]);
                setWinners(response.data["imposters"])

            })
            .catch((error) => {
                Alert.alert('Error', 'Failed to get tasks');
                console.log(error);
            });
    }


    async function sendback() {
        await new Promise((resolve) => setTimeout(resolve, 15000));
        navigation.navigate('Lobby', { game: playerData.game });

    }




    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.txt}>Imposters Won</Text>
            <Text style={styles.names}>Imposters:</Text>
            <Text style={styles.names}>{winners}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'space-evenly',
    },
    txt: {
        color: 'red',
        fontSize: 64,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    names: {
        color: 'red',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ImposterWinScreen;