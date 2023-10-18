import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SineWaveChart = ({ wave1Height, wave1Length, wave2Height, wave2Length }) => {
    let wave1Heightreal = wave1Height / 2
    let wave2Heightreal = wave2Height / 2
    let wave1Lengthreal = wave1Length / 2
    let wave2Lengthreal = wave2Length / 2
    // Generate data points for the first sine wave
    const data1 = [];
    for (let x = 0; x <= 300; x += 5) {
        const y = wave1Heightreal * Math.sin((x / wave1Lengthreal) * Math.PI);
        data1.push(`${x},${y}`);
    }
    const pathData1 = `M${data1.join(' L')}`;

    // Generate data points for the second sine wave
    const data2 = [];
    for (let x = 0; x <= 300; x += 5) {
        const y = wave2Heightreal * Math.sin((x / wave2Lengthreal) * Math.PI);
        data2.push(`${x},${y}`);
    }
    const pathData2 = `M${data2.join(' L')}`;

    return (
        <View style={styles.container}>
            <Svg width={300} height={200} viewBox='0, -100, 300,200'>
                <Path d={pathData1} fill="transparent" stroke="blue" strokeWidth="2" />
                <Path d={pathData2} fill="transparent" stroke="red" strokeWidth="2" />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
});

export default SineWaveChart;
