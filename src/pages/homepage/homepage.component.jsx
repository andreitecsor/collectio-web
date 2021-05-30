import React from 'react';

import './homepage.styles.scss';
import CustomButton from "../../components/custom-button/custom-button.components";
import PopUp from "../../components/pop-up/pop-up.component";
import {auth} from "../../utils/firebase.utils";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import FormInput from "../../components/form-input/form-input.component";
import {setCurrentUser} from "../../redux/user/user.actions";
import axios from "axios";


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.currentUser)
        const {displayName, username} = props.currentUser;

        this.state = {
            displayName: displayName ? displayName : '',
            username: username ? username : ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {setCurrentUser} = this.props;
        axios.put(`http://localhost:8080/api/users/${this.props.currentUser.uid}`,
            {
                displayName: this.state.displayName,
                username: this.state.username
            })
            .then(response => {
                setCurrentUser(response.data);
            })
            .catch(reason => {
                console.warn(reason);
                alert("Username taken");
            })
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }

    render() {
        return (
            <div className='homepage'>
                <PopUp trigger={!this.props.currentUser.username}>
                    <div className='pop-up-description'>
                        <h2>Welcome</h2>
                        <span>You need an unique username and a display name</span>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <FormInput
                            name='username'
                            type='text'
                            value={this.state.username}
                            handleChange={this.handleChange}
                            label='Username'
                            required/>
                        <FormInput
                            name='displayName'
                            type='text'
                            value={this.state.displayName}
                            handleChange={this.handleChange}
                            label='Display Name'
                            required/>
                        <CustomButton type='submit'>Save details</CustomButton>
                    </form>
                </PopUp>
                <div className='content'>
                    <div>
                        PROFILE CARD
                    </div>
                    <div>
                        NEWSFEED
                    </div>
                    <div>
                        POPULAR_CHALLENGES
                    </div>
                </div>
                <CustomButton type='button' onClick={() => auth.signOut()}>LOGOUT</CustomButton>
            </div>)
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const
    mapDispatchToProps = (dispatch) => ({
        setCurrentUser: (user) => dispatch(setCurrentUser(user))
    });


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);