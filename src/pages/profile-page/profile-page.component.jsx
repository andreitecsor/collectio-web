import './profile-page.styles.scss';
import React from "react";
import {withRouter} from 'react-router-dom';
import axios from "axios";
import UserInfo from "../../components/user-info/user-info.component";
import PersonalActivityFeed from "../../components/personal-activity-feed/personal-activity-feed.component";
import AchievementList from "../../components/achievement-list/achievement-list.component";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            profileUser: null
        }
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

    render() {
        if (this.state.username !== this.props.match.params.username) {
            this.getProfileUser();
        }
        return (
            <div className='profile-page' key={this.props.match.params.username}>
                {
                    this.state.profileUser
                        ? (<div className='content'>
                            <UserInfo user={this.state.profileUser}/>
                        <hr/>
                            <div className='activity'>
                                <AchievementList user={this.state.profileUser}/>
                                <PersonalActivityFeed user={this.state.profileUser} pageNumber={0}/>
                            </div>
                        </div>)
                        : <div className='no-user'>USER DOES NOT EXIST</div>
                }
            </div>
        )
    }
}

export default withRouter(ProfilePage);