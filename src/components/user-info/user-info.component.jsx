import './user-info.styles.scss';
import React from "react";
import axios from "axios";
import CustomButton from "../custom-button/custom-button.components";

class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            followers: [],
            followings: []
        }
        console.log(this.props.user)
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/users/${this.props.user.uid}/followings`)
            .then(response => {
                if (response.data) {
                    this.setState({
                        followings: response.data
                    })
                }
            })
            .catch(reason => console.log(reason))
        axios.get(`http://localhost:8080/api/users/${this.props.user.uid}/followers`)
            .then(response => {
                if (response.data) {
                    this.setState({
                        followers: response.data
                    })
                }
            })
            .catch(reason => console.log(reason))
    }

    render() {
        const {user} = this.props;
        const {followings, followers} = this.state;
        return (
            <div className='user-info'>
                <img src={`https://robohash.org/${user.username}?set=set1`} width='150' height='150'
                     alt='Profile avatar'/>
                <div>{user.displayName}</div>
                <hr/>
                <div>{followers.length} followers</div>
                <hr/>
                <div>{followings.length} following</div>
                <CustomButton>EDIT PROFILE</CustomButton>
            </div>
        )
    }
}

export default UserInfo;