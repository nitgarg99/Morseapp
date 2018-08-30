import React, { Component } from 'react';
import { AppRegistry, Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class MorseCity extends Component {
    _onPressButton() {
        this.props.navigation.navigate('Message');
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#D1F2EB'}}>
                <View style={styles.taskbar}>
                    <View style={{flex: 9, backgroundColor: '#987fba'}}>
                    </View>
                    <View style={{flex: 1, backgroundColor: '#ffffff', }}>
                        <TouchableOpacity style={{flex:1}} onPress={this._onPressButton.bind(this)}>
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

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '', 
            password: '',
            learning: 'We are learning!',
        };
    }
    _onPressSubmit() {

    } 
    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', position: 'absolute'}} >
                    <TextInput onChangeText={(text) => this.setState({username: text})} value={this.state.username}  placeholder='Username'/>
                    <TextInput onChangeText={(text) => this.setState({password: text})} value={this.state.password}  placeholder='Password' secureTextEntry={true}/>
                    <TouchableOpacity style={{flex:1}} onPress={this._onPressSubmit.bind(this)}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

class MessageScreen extends Component {
    _onPressButton() {
        Alert.alert('Tap!');
    }
    render() {
        return (
            <TouchableOpacity style={{flex: 1}} onPress={this._onPressButton}>
                <SafeAreaView style={{flex: 1, backgroundColor: '#51667a', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center', position: 'absolute'}} >
                        <Text style={{flex: 1,}}>
                            Tap anywhere on screen
                        </Text>
                    </View>
                </SafeAreaView>
            </TouchableOpacity>
        );
    }
}

const RootStack = createStackNavigator(
    {
    Home: MorseCity,
    Message: MessageScreen,
    Login: LoginScreen,
    },
    {
        initialRouteName: 'Login',
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

AppRegistry.registerComponent('morseapp', () => RootStack);
