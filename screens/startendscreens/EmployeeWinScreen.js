import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView, Text, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlayerContext from '../../context/playerContext';

const EmployeeWinScreen = ({ }) => {
    const { playerData } = useContext(PlayerContext);
    const navigation = useNavigation();
    let [winners, setWinners] = useState([]);
    console.log(playerData)

    const params = JSON.stringify({
        "game": playerData,
    });

    useEffect(() => {
        EmployeeWinData();
        sendback();
    }, []);

    const EmployeeWinData = () => {
        axios.post(global.TTTIP + '/games/' + playerData.game.title + '/employee_win_data/', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log(response.data["employees"]);
                setWinners(response.data["employees"])

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
            <Text style={styles.header}>Employees Won</Text>
            <Text style={styles.txt}>Employees:</Text>
            <Text style={styles.names}>{winners.join(" ")}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'space-evenly',
    },
    header: {
        color: 'green',
        fontSize: 64,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    txt: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    names: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default EmployeeWinScreen;