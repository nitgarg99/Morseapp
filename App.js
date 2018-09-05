/* If you are an employer judging my coding style from this, I'm sorry for this mess.
 * I still have to create style sheets to clean up all the 'style = {{insert mess here}}'
 * and I will be moving the screens into seperate classes. Hopefully that eases your worries! 
 *
 * If you would like to see some neater code, checkout the alarm project on my github. */

import React, { Component } from 'react';
import { AppRegistry, Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'firebase';

class MorseCity extends Component {
    _onPressButton() {
        this.props.navigation.navigate('Message');
    }

    _onPressSignOut() {
        let user = firebase.auth().currentUser;
        firebase.auth().signOut();
        console.log(user.email + ' logged out!');
        this.props.navigation.navigate('Login');
    }
   

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
                <View style={styles.taskbar}>
                    <View style={{flex: 9, backgroundColor: '#987fba'}}>
                    </View>
                    <View style={{flex: 1, backgroundColor: '#ffffff', }}>
                        <TouchableOpacity style={{flex:1}} onPress={this._onPressButton.bind(this)}>
                            <Image resizeMode='contain' source={require('./images/message.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, backgroundColor: '#ffffff', }}>
                        <TouchableOpacity style={{flex:1}} onPress={this._onPressSignOut.bind(this)}>
                            <Text> Sign Out </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{backgroundColor: '#ffffff', flex: 20}}>
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
            errorMessage: '',
        };
    }
    _onPressSubmit() {
        let logged = true;
        this.setState({errorMessage: ''});
        firebase.auth().signInWithEmailAndPassword(this.state.username + '@test.com', this.state.password).then(
            ((user) => {
                console.log('Signed in ' + this.state.username);
                this.props.navigation.navigate('Home');
            }),
            ((error) => {
                this.setState(errorMessage: error.message);
            })
        );
    } 
    _onPressSignup() {
        this.props.navigation.navigate('Signup');
    }
    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 1, backgroundColor: '#ff2', justifyContent: 'center', position: 'absolute'}} >
                    <View style={{flex: 1, backgroundColor: '#fbf', justifyContent: 'center' }}>
                        <TextInput onChangeText={(username) => this.setState({username})} value={this.state.username}  placeholder='Username' textAlign='center'/>
                        <TextInput onChangeText={(password) => this.setState({password})} value={this.state.password}  placeholder='Password' secureTextEntry={true} textAlign='center'/>
                        <TouchableOpacity style={{flex:1}} onPress={this._onPressSubmit.bind(this)}>
                            <Text style={{alignSelf: 'center'}}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}} onPress={this._onPressSignup.bind(this)}>
                            <Text style={{alignSelf: 'center'}}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{color: 'red'}}> {this.state.errorMessage}</Text>
                    </View>
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
            confirmPassword: '',
            errorMessage: '',

        };
    }
    _onPressSignup() {
        let logged = true;
        this.setState({errorMessage: ''});
        if (this.state.password == this.state.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(this.state.username + '@test.com', this.state.password).then(
                ((user) => {
                    console.log('Signed up ' + this.state.username);
                    this.props.navigation.navigate('Home');
                }),
            ((error) => {
                this.setState({errorMessage: error.message});
            })
            );
        } else {
            this.setState({errorMessage: 'Passwords do not match.'});
            logged = false;
        }

    } 
    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 1, backgroundColor: '#ff2', justifyContent: 'center', position: 'absolute'}} >
                    <View style={{flex: 1, backgroundColor: '#fbf', justifyContent: 'center' }} >
                        <TextInput onChangeText={(username) => this.setState({username})} value={this.state.username}  placeholder='Username' textAlign='center'/>
                        <TextInput onChangeText={(password) => this.setState({password})} value={this.state.password}  placeholder='Password' secureTextEntry={true} textAlign='center'/>
                        <TextInput onChangeText={(confirmPassword) => this.setState({confirmPassword})} value={this.state.confirmPassword}  placeholder='Confirm Password' secureTextEntry={true} textAlign='center'/>
                        <TouchableOpacity style={{flex:1}} onPress={this._onPressSignup.bind(this)}>
                            <Text style={{alignSelf:'center'}}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
class MessageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            messageStart: false,
            morseTime: 0,
            message: [],
        };
    }
    _onPressMessage() {
        if (this.state.messageStart == false) {
            this.setState({
                messageStart:  true,    
                morseTime: Date.now(),
            });
        }
        else {
            this.state.message.push(Date.now() - this.state.morseTime);
            //Debug: console.log(this.state.message.length);
            this.setState({
                morseTime: Date.now(),
            });
        }
    }
    _onSend(){
        //Debug: console.log(this.state.message);
    }


    render() {
        return (

            <SafeAreaView style={{flex: 1, backgroundColor: '#51667a', }}>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#ff32ba', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={{fontSize:50}} adjustsFontSizeToFit={true}>To: </Text>
                    <TextInput placeholder='Enter recepient'/>
                </View>
                <TouchableOpacity style={{flex: 25}} onPress={this._onPressMessage.bind(this)}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',  backgroundColor: '#23bca2'}} >
                        <Text style={{flex: 1, alignSelf: 'center', position: 'absolute'}}>
                            Tap anywhere on screen
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#ff32ba', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <TouchableOpacity onPress={this._onSend.bind(this)}>
                        <Text> Send </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
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
        headerMode: 'none',
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
