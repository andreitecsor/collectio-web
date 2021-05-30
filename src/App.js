import './App.css';
import React from "react";
import HomePage from "./pages/homepage/homepage.component";
import AuthPage from "./pages/authpage/authpage.component";
import {Route, Switch} from 'react-router-dom';
import {auth} from "./utils/firebase.utils";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from "./redux/user/user.selectors";
import {setCurrentUser} from "./redux/user/user.actions";
import axios from "axios";
import Header from "./components/header/header.component";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isServerAvailable: true
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                axios.post('http://localhost:8080/api/users',
                    {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email
                    })
                    .then(response => {
                        console.log(response.data);
                        setCurrentUser(response.data);
                    })
                    .catch(reason => {
                        console.log(reason)
                        this.setState({
                            isServerAvailable: false
                        })
                    });
            } else {
                setCurrentUser(firebaseUser);
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                {
                    this.props.currentUser
                    ? <Header/>
                    : null
                }
                {this.state.isServerAvailable ?
                    (<Switch>
                        <Route exact path='/'
                               render={() =>
                                   this.props.currentUser
                                       ? (<HomePage/>)
                                       : (<AuthPage/>)
                               }/>
                        {/*<Route exact path='/challenges'*/}
                        {/*       render={() =>*/}
                        {/*           this.props.currentUser*/}
                        {/*               ? (<Challenges/>)*/}
                        {/*               : (<AuthPage/>)*/}
                        {/*       }/>*/}
                    </Switch>) :
                    <span>Server is down</span>
                }
            </div>
        );
    }
}

const
    mapStateToProps = createStructuredSelector({
        currentUser: selectCurrentUser
    });

const
    mapDispatchToProps = (dispatch) => ({
        setCurrentUser: (user) => dispatch(setCurrentUser(user))
    });


export default connect(mapStateToProps, mapDispatchToProps)(App);