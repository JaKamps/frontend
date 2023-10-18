import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, ImageBackground, View } from 'react-native';
import PlayerContext from '../../context/playerContext';

const EmployeeStartScreen = ({ navigation, route }) => {
    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        const moveScreen = setTimeout(() => {
            navigation.navigate('Tasks', route);
        }, 6000);

        return () => {
            clearTimeout(timer);
            clearTimeout(moveScreen);
        };
    }, []);

    return (
        <ImageBackground source={global.IMAGE} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.header}>You are a</Text>
                </View>
                <View>
                    {isVisible && <Text style={styles.role}>Employee</Text>}
                </View>
                <View>
                    {isVisible && <Text style={styles.description}>you are an employee try to complete your tasks and survive</Text>}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 32,
    },
    header: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
    },
    role: {
        fontSize: 48,
        color: 'green',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default EmployeeStartScreen;
