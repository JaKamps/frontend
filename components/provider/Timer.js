import React, { Component } from 'react';
import { View, Text } from 'react-native';

class CountdownTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeRemaining: props.initialTime, // Initial time in seconds
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.state.timeRemaining > 0) {
                this.setState({ timeRemaining: this.state.timeRemaining - 1 });
            } else {
                clearInterval(this.interval);
                // You can trigger some action when the countdown reaches zero
                // For example, display a message or perform some task.
            }
        }, 1000); // Update the timer every 1 second (1000 milliseconds)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const minutes = Math.floor(this.state.timeRemaining / 60);
        const seconds = this.state.timeRemaining % 60;

        return (
            <View>
                <Text style={{ color: "red", fontSize: 22 }}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>
            </View>
        );
    }
}

export default CountdownTimer;
