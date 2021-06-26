import React from "react";
import './profile-card.styles.scss';
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import {selectAllActiveChallenges} from "../../redux/challenge/challenge.selectors";
import axios from "axios";

class ProfileCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            challengesByInfluence : 0,
            influencedPeople: 0
        }

    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/users/${this.props.currentUser.uid}/influenced/challenges`)
            .then(result => this.setState({
                challengesByInfluence : result.data
            }))
            .catch(reason => console.log(reason))

        axios.get(`http://localhost:8080/api/users/${this.props.currentUser.uid}/influenced`)
            .then(result => this.setState({
                influencedPeople : result.data
            }))
            .catch(reason => console.log(reason))
    }


    render() {
        const {activeChallenges} = this.props;
        const {displayName, username} = this.props.currentUser;
        return (
            <div className='profile-card'>
                <img src={`https://robohash.org/${username}?set=set1`} width='150' height='150'
                     alt='Profile avatar'/>
                <div>{displayName}</div>
                <hr/>
                <div>Active Challenges : {activeChallenges.length}</div>
                <hr/>
                <div>Challenges started because of you : {this.state.challengesByInfluence}</div>
                <hr/>
                <div>People influenced : {this.state.influencedPeople}</div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
        currentUser: selectCurrentUser,
        activeChallenges: selectAllActiveChallenges
    }
);


export default connect(mapStateToProps)(ProfileCard);