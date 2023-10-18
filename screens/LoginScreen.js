import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Alert, ImageBackground, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import UserContext from '../context/userContext';


const LoginScreen = () => {
    const { updateUserData, userData } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const Navigation = useNavigation();

    const handleInputChangeUsername = (text) => {
        setUsername(text);
    };
    const handleInputChangePassword = (text) => {
        setPassword(text);
    };

    params = JSON.stringify({
        "username": username,
        "password": password,
    });



    const login = () => {
        axios.post(global.TTTIP + '/api/login/', params, {
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                updateUserData(response.data);
                Navigation.navigate('Main');
            })
            .catch((error) => {
                Alert.alert('Error', 'a error has happened');
                console.log(error);
            });
    }

    return (
        <ImageBackground source={global.IMAGE} style={styles.image}>
            <SafeAreaView style={styles.container}>
                <View style={styles.alertContent}>
                    <View style={styles.headercontainer}>
                        <Text style={styles.header}>login</Text>
                    </View>
                    <Text style={styles.header}>Username</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleInputChangeUsername}
                        value={username}
                        placeholder="Username"
                    />
                    <Text style={styles.header}>password</Text>
                    <TextInput
                        style={styles.input}
                        type="password"
                        onChangeText={handleInputChangePassword}
                        value={password}
                        placeholder="Password"
                    />
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={login}
                        >
                            <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => Navigation.navigate('register')}
                        >
                            <Text style={styles.text}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    headercontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    header: {
        alignSelf: 'center',
        fontSize: 32,
        color: "white",
    },
    input: {
        padding: 10,
        height: 40,
        margin: 12,
        minWidth: 200,
        borderWidth: 1,
        backgroundColor: "white",
    },
    text: {
        color: "white",
        fontSize: 20,
    },
    alertContent: {
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    buttonContainer: {
        width: 200,
        height: 50,
        alignItems: "center",
        backgroundColor: "#1400FF",
        borderRadius: 50,
        padding: 10,
        margin: 25,
    },


});



export default LoginScreen
