import React, { Component } from 'react';
import { View} from 'react-native';
import firebase from 'firebase';
import { Header, Button, Card, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

    state = { loggedIn: null }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyC5rGJY8BQVbVSt7_OJGS_EzpWD0xTf2pM",
            authDomain: "reactnativeauth-ab9e6.firebaseapp.com",
            databaseURL: "https://reactnativeauth-ab9e6.firebaseio.com",
            projectId: "reactnativeauth-ab9e6",
            storageBucket: "reactnativeauth-ab9e6.appspot.com",
            messagingSenderId: "381108237676"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true})
            } else {
                this.setState({ loggedIn: false })
            }
        });
    }

    renderContent() {
        switch(this.state.loggedIn) {
            case true:
                return (
                    <Card>
                        <CardSection>
                            <Button 
                                buttonText='Log out' 
                                onPress={()=> firebase.auth().signOut()}
                            />
                        </CardSection>
                    </Card>
                );
            case false:
                return <LoginForm />;
            default:
                return (
                    <View>
                        <Spinner size='large' />
                    </View>
                );
        }
    }

    render() {
        return(
            <View>
                <Header headerText='Authentication' />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;