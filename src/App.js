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
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ChallengePage from "./pages/challenges-page/challenge-page.component";
import {setAllChallenges} from "./redux/challenge/challenge.actions";
import ProfilePage from "./pages/profile-page/profile-page.component";
import SearchPage from "./pages/search-page/search-page.component";
import EditProfilePage from "./pages/edit-profile-page/edit-profile-page.component";

class App extends React.Component {
    constructor(props) {
        super(props);
        TimeAgo.addDefaultLocale(en);
        this.state = {
            isServerAvailable: true
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser, setAllChallenges} = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                axios.post('http://localhost:8080/api/users',
                    {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email
                    })
                    .then(response => {
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

            axios.get('http://localhost:8080/api/challenges/all')
                .then(response => setAllChallenges(response.data))
                .catch(reason => console.log(reason))


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
                        <Route exact path='/challenges'
                               render={() =>
                                   this.props.currentUser
                                       ? (<ChallengePage/>)
                                       : (<AuthPage/>)
                               }/>
                        <Route exact path='/challenges'
                               render={() =>
                                   this.props.currentUser
                                       ? (<ChallengePage/>)
                                       : (<AuthPage/>)
                               }/>
                        <Route exact path='/profile/:username'
                               render={() =>
                                   this.props.currentUser
                                       ? (<ProfilePage/>)
                                       : (<AuthPage/>)
                               }/>
                        <Route exact path='/search=:keyword'
                               render={() =>
                                   this.props.currentUser
                                       ? (<SearchPage/>)
                                       : (<AuthPage/>)
                               }/>
                        <Route exact path='/edit'
                               render={() =>
                                   this.props.currentUser
                                       ? (<EditProfilePage/>)
                                       : (<AuthPage/>)
                               }/>
                    </Switch>) :
                    <span>Server is down</span>
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setAllChallenges: (challenges) => dispatch(setAllChallenges(challenges)),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);