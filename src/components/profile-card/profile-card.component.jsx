import React from "react";
import './profile-card.styles.scss';
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import {selectAllActiveChallenges} from "../../redux/challenge/challenge.selectors";
import axios from "axios";
import {Link} from "react-router-dom";

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
                <h3><Link to={`/profile/${username}`}>{displayName}</Link></h3>
                <hr className='separator'/>
                <Link to='/challenges' >Active Challenges : <span className='clickable-content'>{activeChallenges.length}</span></Link>
                <hr className='separator2'/>
                <div>Challenges started because of you : <span className='bold'>{this.state.challengesByInfluence}</span></div>
                <hr className='separator2'/>
                <div>People influenced : <span className='bold'>{this.state.influencedPeople}</span></div>
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