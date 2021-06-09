import React from "react";
import './profile-card.styles.scss';
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import axios from "axios";

class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeChallenges: 0,
            peopleInfluenced: 0
        }
        this.getActiveChallenges();
        this.getPeopleInfluenced();
    }

    getActiveChallenges = () => {
        axios.get(`http://localhost:8080/api/joined/actives/${this.props.currentUser.uid}`)
            .then(response => this.setState({
                activeChallenges: response.data.length
            }))
            .catch(reason => console.log(reason));
    }

    getPeopleInfluenced = () => {
        //TODO: get people influenced
    }

    render() {
        const {displayName, username} = this.props.currentUser;
        return (
            <div className='profile-card'>
                <img src={`https://robohash.org/${username}?set=set1`} width='150' height='150'
                     alt='Profile avatar'/>
                <div>{displayName}</div>
                <hr/>
                <div>Active Challenges : {this.state.activeChallenges}</div>
                <hr/>
                <div>Challenges started because of you : {this.state.peopleInfluenced}</div>
                <hr/>
                <div>People influenced : {this.state.peopleInfluenced}</div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
        currentUser: selectCurrentUser,
    }
);


export default connect(mapStateToProps)(ProfileCard);