import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeComponent = ({ title }) => {
 let logoFromFile = require('../../assets/logo.png');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>QR Code</Text>
      <QRCode
        value={`${title}`}
        size={200} 
        color="black"
        backgroundColor="white"
        logoBackgroundColor='white'
        logoSize={32}
        logo={logoFromFile}
        logoMargin={2}
        logoBorderRadius={15}
      />
    </View>
  );
};

export default QRCodeComponent;
