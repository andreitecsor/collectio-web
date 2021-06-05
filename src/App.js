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
import {setAllActiveChallenges, setAllChallenges} from "./redux/challenge/challenge.actions";

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
        const {setCurrentUser, setAllChallenges,setAllActiveChallenges} = this.props;
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
                        this.setActiveChallenges(response, setAllActiveChallenges);
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

    setActiveChallenges(response, setAllActiveChallenges) {
        axios.get(`http://localhost:8080/api/joined/actives/${response.data.uid}`)
            .then(response => {
                setAllActiveChallenges(response.data)
                console.log(response.data)
            })
            .catch(reason => console.log(reason))
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
                    </Switch>) :
                    <span>Server is down</span>
                }
            </div>
        );
    }
}

const
    mapStateToProps = createStructuredSelector({
        currentUser: selectCurrentUser,
    });

const
    mapDispatchToProps = (dispatch) => ({
        setCurrentUser: (user) => dispatch(setCurrentUser(user)),
        setAllChallenges: (challenges) => dispatch(setAllChallenges(challenges)),
        setAllActiveChallenges: (challenges) => dispatch(setAllActiveChallenges(challenges))
    });


export default connect(mapStateToProps, mapDispatchToProps)(App);