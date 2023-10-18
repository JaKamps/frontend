import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';


const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
        borderRadius: 16,
    },

    propsForDots: {
        r: '1',
        strokeWidth: '2',
        stroke: 'blue',
    },
    yAxisLabel: '',
    yAxisSuffix: '',


};
let height = []
height = 0

const FrequencyWavesGraph = ({ wave1Height, wave1Length, wave2Height, wave2Length }) => {

    const wave1Data = {
        labels: [...Array(height).keys()].map(String),
        datasets: [
            {
                data: generateWaveform(wave1Height, wave1Length),
                data: generateWaveform(wave2Height, wave2Length),

            },
        ],
        config: {
            barMinWidth: 20,
        },
    };


    function generateWaveform(height, length) {
        const waveform = [];
        for (let i = 0; i < length; i++) {
            const value = height * Math.sin((2 * Math.PI * i) / length);
            waveform.push(value);
        }
        return waveform;
    }


    return (
        <View>
            <LineChart
                data={wave1Data}
                width={350}
                height={200}
                yAxisInterval={20}
                chartConfig={chartConfig}
                bezier
                style={{
                    marginVertical: 10,
                }}
            />
        </View>
    );
};

export default FrequencyWavesGraph;
