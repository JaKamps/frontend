import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Alert, ImageBackground, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import UserContext from '../context/userContext';


const RegisterScreen = () => {
    const { updateUserData, userData } = useContext(UserContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const Navigation = useNavigation();

    const handleInputChangeUserName = (text) => {
        setUserName(text);
    };
    const handleInputChangePassword = (text) => {
        setPassword(text);
    };
    const handleInputChangeEmail = (text) => {
        setEmail(text);
    };
    const handleInputChangeConfirmPassword = (text) => {
        setConfirmPassword(text);
    };

    params = JSON.stringify({
        "username": userName,
        "password": password,
        "email": email,
    });



    const register = () => {
        if (password != confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        } else if (password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters');
            return;
        }

        axios.post(global.TTTIP + '/users/0/create_new_user/', params, {
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                updateUserData(response.data)
                console.log(userData);
                Navigation.navigate('Main');
            })
            .catch((error) => {
                Alert.alert('Error', 'A error has occurred');
                console.log(error);
            });
    }

    return (
        <ImageBackground source={global.IMAGE} style={styles.image}>
            <SafeAreaView style={styles.container}>
                <View style={styles.alertContent}>
                    <View style={styles.headercontainer}>
                        <Text style={styles.header}>Register Account</Text>
                    </View>
                    <Text style={styles.header}>Username</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleInputChangeUserName}
                        value={userName}
                        placeholder="UserName"
                    />
                    <Text style={styles.header}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleInputChangeEmail}
                        value={email}
                        placeholder="Email"
                    />
                    <Text style={styles.header}>password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleInputChangePassword}
                        value={password}
                        placeholder="Password"
                    />
                    <Text style={styles.header}>confirm password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleInputChangeConfirmPassword}
                        value={confirmPassword}
                        placeholder="Password"
                    />
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={register}
                        >
                            <Text style={styles.text}>Create</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => Navigation.navigate('login')}
                        >
                            <Text style={styles.text}>Already a account?</Text>
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



export default RegisterScreen
