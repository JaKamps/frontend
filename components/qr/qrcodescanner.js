import React, { Component, useContext } from 'react';
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import PlayerContext from '../context/playerContext';

const { playerData } = useContext(PlayerContext);


class QRCodeScanner extends Component {

    onBarCodeRead = (e) => {
        const params = JSON.stringify({
            "player": playerData.player,
            "task": e.data,
        });
        axios.post(global.TTTIP + '/games/' + playerData.game.title + '/task_scanner/', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                task = response.data;
                console.log('Scanned QR Code:', e.data);
                console.log(response.data);
                // Navigation.navigate(task.name, task);
            })
            .catch((error) => {
                Alert.alert('Error', 'Failed to start the task');
                console.log(error);
            });
        console.log('Scanned QR Code:', e.data);
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <RNCamera
                    style={{ flex: 1 }}
                    onBarCodeRead={this.onBarCodeRead}
                    barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                />
            </View>
        );
    }
}

export default QRCodeScanner;