import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView } from "react-native";
import FrequencyWavesGraph from "../../components/graph";
import TurnableButton from "../../components/turnablebutton";
import SineWaveChart from "../../components/lines";
import axios from "axios";
import PlayerContext from '../../context/playerContext';


const JammerScreen = () => {
    const Navigation = useNavigation();
    const { playerData } = useContext(PlayerContext);

    // random number generator
    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    const [height, setHeight] = useState(random(1, 350));
    const [lenght, setLenght] = useState(random(1, 350));

    const [buttonAngle1, setButtonAngle1] = useState(1);
    const [buttonAngle2, setButtonAngle2] = useState(1);

    const updateButtonAngle1 = (angle) => {
        setButtonAngle1(angle);
        console.log(angle);
    };
    const updateButtonAngle2 = (angle) => {
        setButtonAngle2(angle);
        console.log(angle);
    };

    useEffect(() => {
        checkvictory();
    }
    );

    const checkvictory = () => {
        if (Math.floor(buttonAngle1) + 1 >= height && Math.floor(buttonAngle2) + 1 >= lenght && Math.floor(buttonAngle1) - 1 <= height && Math.floor(buttonAngle2) - 1 <= lenght) {
            const params = JSON.stringify({
                "data": playerData,

            });
            axios.post(global.TTTIP + '/games/' + playerData.game.title + '/jammer_complete/', params, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    console.log(response.data);
                    Navigation.navigate('Tasks');

                }
                )
                .catch((error) => {
                    Alert.alert('Error', 'Failed to start the task');
                    console.log(error);
                });

        }

    }



    return (
        <ImageBackground source={global.IMAGE} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={styles.screen}>
                <View style={styles.TaskCard}>
                    <View style={styles.graph}>
                        <Text style={styles.text}></Text>
                        <SineWaveChart wave1Height={height} wave1Length={lenght} wave2Height={buttonAngle1} wave2Length={buttonAngle2} />
                    </View>
                    <View style={styles.buttons}>
                        <TurnableButton size={100} updateAngle={updateButtonAngle1} />
                        <TurnableButton size={100} updateAngle={updateButtonAngle2} />
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
});

export default JammerScreen;
