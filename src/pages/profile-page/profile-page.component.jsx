import './profile-page.styles.scss';
import React from "react";
import {withRouter} from 'react-router-dom';
import axios from "axios";
import UserInfo from "../../components/user-info/user-info.component";
import PersonalActivityFeed from "../../components/personal-activity-feed/personal-activity-feed.component";
import AchievementList from "../../components/achievement-list/achievement-list.component";
import PopUp from "../../components/pop-up/pop-up.component";
import ChallengeCompleteDetails from "../../components/challenge-complete-details/challenge-complete-details.component";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            profileUser: null,
            challengePopup: false,
            challenge: null,
            influencerId: null
        }
    }

    render() {
        if (this.state.username !== this.props.match.params.username) {
            this.getProfileUser();
        }
        return (
            <div className='profile-page' key={this.props.match.params.username}>
                <div>
                    {this.getChallengePopup()}
                </div>
                {
                    this.state.profileUser
                        ? (<div className='content'>
                            <UserInfo user={this.state.profileUser}/>
                            <hr/>
                            <div className='activity'>
                                <AchievementList user={this.state.profileUser} activatePopup={this.activatePopup}/>
                                <PersonalActivityFeed user={this.state.profileUser} pageNumber={0} activatePopup={this.activatePopup}/>
                            </div>
                        </div>)
                        : <div className='no-user'>USER DOES NOT EXIST</div>
                }
            </div>
        )
    }

    getProfileUser() {
        const username = this.props.match.params.username;
        axios.get(`http://localhost:8080/api/users/username/${username}`)
            .then(response => {
                if (response.data) {
                    this.setState({
                        username: this.props.match.params.username,
                        profileUser: response.data
                    })
                }
            })
            .catch(reason => console.log(reason))
    }

    getChallengePopup() {
        return <PopUp trigger={this.state.challengePopup} close={this.deactivatePopup}>
            {this.state.challenge
                ? <ChallengeCompleteDetails challenge={this.state.challenge}
                                            deactivatePopup={this.deactivatePopup}
                                            influencerId={this.state.influencerId}
                />
                : ""}
        </PopUp>
    }

    activatePopup = (challenge, influencerId = null) => {
        if (this.props.currentUser.uid === influencerId) {
            influencerId = null;
        }
        this.setState({
            challengePopup: true,
            challenge: challenge,
            influencerId: influencerId ? influencerId : null
        })
    }

    deactivatePopup = () => {
        this.setState({
            challengePopup: false,
            challenge: null,
            influencerId: null
        })
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});


export default connect(mapStateToProps)(withRouter(ProfilePage));