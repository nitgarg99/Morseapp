import React, { Component } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class MorseCity extends Component {
    _onPressButton() {
        Alert.alert('Button Pressed!');
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#D1F2EB'}}>
                <View style={styles.taskbar}>
                    <View style={{flex: 9, backgroundColor: '#987fba'}}>
                    </View>
                    <View style={{flex: 1, backgroundColor: '#ffffff', }}>
                        <TouchableOpacity style={{flex:1}}>
                            <Image resizeMode='contain' source={require('./images/message.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{backgroundColor: '#26bb90', flex: 20}}>
                </View>
            </SafeAreaView>
        );
    }
}

class MessageScreen extends Component {
    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#51667a', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center', position: 'absolute'}} >
                    <Text style={{flex: 1,}}>
                        Tap anywhere on screen
                    </Text>
                </View>
            </SafeAreaView>
        );
    }
}

const RootStack = createStackNavigator(
    {
    Home: MorseCity,
    Message: MessageScreen,
    },
    {
        initialRouteName: 'Message',
    }
);

export default class App extends Component {
    render() {
        return <RootStack />;
    }
}

const styles = StyleSheet.create({
    icon: {
        flex: 1,
        height: undefined,
        width: undefined,
    },
    taskbar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#abb2b9',
    },
});
