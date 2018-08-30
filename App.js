import React, { Component } from 'react';
import { AppRegistry, Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'firebase';

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
    _onPressSignup() {
        this.props.navigation.navigate('Signup');
    }
    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', position: 'absolute'}} >
                    <TextInput onChangeText={(username) => this.setState({username})} value={this.state.username}  placeholder='Username'/>
                    <TextInput onChangeText={(password) => this.setState({password})} value={this.state.password}  placeholder='Password' secureTextEntry={true}/>
                    <TouchableOpacity style={{flex:1}} onPress={this._onPressSubmit.bind(this)}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} onPress={this._onPressSignup.bind(this)}>
                        <Text>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

class SignupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '', 
            password: '',
            errorMessage: '',

        };
    }
    _onPressSignup() {
        this.setState({errorMessage: ''});
        firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password).catch((error) => {
            this.setState({errorMessage: error.message})
        });

    } 
    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', position: 'absolute'}} >
                    <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', }} >
                        <TextInput onChangeText={(username) => this.setState({username})} value={this.state.username}  placeholder='Username'/>
                        <TextInput onChangeText={(password) => this.setState({password})} value={this.state.password}  placeholder='Password' secureTextEntry={true}/>
                        <TouchableOpacity style={{flex:1}} onPress={this._onPressSignup.bind(this)}>
                            <Text>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <Text>{this.state.errorMessage}</Text>
                    </View>
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
        Signup: SignupScreen,
    },
    {
        initialRouteName: 'Login',
    }
);

const config = {
    apiKey: "AIzaSyDLasnATBHpxYFBzM101QWT1q2clHjQTcg",
    authDomain: "morseapp-f0c08.firebaseapp.com",
    databaseURL: "https://morseapp-f0c08.firebaseio.com",
};

export default class App extends Component {

    render() {
        firebase.initializeApp(config);
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
