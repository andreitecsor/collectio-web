import './profile-page.styles.scss';
import React from "react";
import {withRouter} from 'react-router-dom';
import axios from "axios";
import ProfileCard from "../../components/profile-card/profile-card.component";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileUser: null
        }
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        axios.get(`http://localhost:8080/api/users/username/${username}`)
            .then(response => {
                if (response.data) {
                    this.setState({
                        profileUser: response.data
                    })
                }
            })
            .catch(reason => console.log(reason))
    }

    render() {
        return (
            <div className='profile-page'>
                {
                    this.state.profileUser
                        ? (<div className='content'>
                            <ProfileCard onProfile/>
                        </div>)
                        : <div>USER DOES NOT EXISTS</div>
                }
            </div>
        )
    }
}

export default withRouter(ProfilePage);