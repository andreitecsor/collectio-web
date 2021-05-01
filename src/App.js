import React from "react";
import {Route, Switch} from 'react-router-dom';

import './App.css';
import HomePage from "./pages/homepage/homepage.component";
import {auth} from "./utils/firebase.utils";
import AuthPage from "./pages/authpage/authpage.component";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: null
        };
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({currentUser: user});
            if (user) {
                console.log(user.uid);
                console.log(user.displayName);
                console.log(user.email);
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
                    {this.state.currentUser ?
                        <Route exact path='/' component={() => <HomePage user={this.state.currentUser}/>}/>
                        :
                        <Route exact path='/' component={AuthPage}/>
                    }
                </Switch>
            </div>
        );
    }


}

export default App;
