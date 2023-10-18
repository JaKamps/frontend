import React, { Component } from 'react';
import { View, PanResponder, Text } from 'react-native';

class TurnableButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0,
            centerX: 0,
            centerY: 0,
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: this.handlePanResponderMove,
        });
    }

    handleLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        const centerX = width / 2;
        const centerY = height / 2;
        this.setState({ centerX, centerY });
    };

    handlePanResponderMove = (_, gestureState) => {
        const { dx, dy } = gestureState;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        let newAngle = angle;
        if (angle < 0) {
            newAngle += 360;
        }

        this.setState({ angle: newAngle });

        // Call the updateAngle function from props with the new angle value
        this.props.updateAngle(newAngle);
    };

    render() {
        const { angle } = this.state;
        const { size } = this.props;

        return (
            <View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: 'lightblue',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [{ rotate: `${angle}deg` }],
                }}
                {...this.panResponder.panHandlers}
            >
                <Text>You spin me right round</Text>
            </View>
        );
    }
}

export default TurnableButton;
