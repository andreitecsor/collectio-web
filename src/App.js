import React from "react";
import {Route, Switch} from 'react-router-dom';

import './App.css';
import HomePage from "./pages/homepage/homepage.component";
import {auth} from "./utils/firebase.utils";
import AuthPage from "./pages/authpage/authpage.component";
import axios from "axios";
import {endpoint} from "./utils/endpoint";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            firebaseUser: null,
            appUser: null
        };
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({firebaseUser: user});
            console.log(user)
            if (user) {
                axios.get(endpoint("user") + user.email).then(response => {
                    console.log(response)
                    if (response.data === "") {
                        axios.post(endpoint("user"), {
                            displayName: user.displayName,
                            email: user.email
                        }).then(res =>
                            this.setState({
                                appUser: res.data
                            }));
                    } else {
                        this.setState({
                            appUser: response.data
                        });
                    }
                })
            } else {
                this.setState({
                    appUser: null
                })
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Switch>
                    {this.state.firebaseUser ?
                        <Route exact path='/' component={() => <HomePage user={this.state.appUser}/>}/>
                        :
                        <Route exact path='/' component={AuthPage}/>
                    }
                </Switch>
            </div>
        );
    }


}

export default App;
