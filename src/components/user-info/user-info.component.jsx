import './user-info.styles.scss';
import React from "react";
import axios from "axios";
import CustomButton from "../custom-button/custom-button.components";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {auth} from "../../utils/firebase.utils";

class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            followers: [],
            followings: [],
            loggedUserFollowing: false
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
                    const loggedUserAsFollower = response.data.find(user => user.uid === this.props.currentUser.uid);
                    if (loggedUserAsFollower) {
                        this.setState({
                            followers: response.data,
                            loggedUserFollowing: true
                        })
                    } else {
                        this.setState({
                            followers: response.data,
                            loggedUserFollowing: false
                        })
                    }


                }
            })
            .catch(reason => console.log(reason))
    }

    followUnfollow = () => {
        if (this.state.loggedUserFollowing === true) {
            axios.put(`http://localhost:8080/api/follows/end/${this.props.currentUser.uid}->${this.state.user.uid}`)
                .then(response => this.setState({
                    loggedUserFollowing: false
                }))
                .catch(reason => console.log(reason))
        } else {
            axios.put(`http://localhost:8080/api/follows/${this.props.currentUser.uid}->${this.state.user.uid}`)
                .then(response => this.setState({
                    loggedUserFollowing: true
                }))
                .catch(reason => console.log(reason))
        }
    }

    render() {
        const {user} = this.props;
        const {currentUser} = this.props;
        const {followings, followers} = this.state;
        return (
            <div className='user-info'>
                <img src={`https://robohash.org/${user.username}?set=set1`} width='150' height='150'
                     alt='Profile avatar'/>
                <div>{user.displayName}</div>
                <hr/>
                <div>{followers.length} {followers.length === 1 ? 'follower' : 'followers'}</div>
                <hr/>
                <div>{followings.length} following</div>
                {user.uid === currentUser.uid
                    ? <CustomButton>EDIT PROFILE</CustomButton>
                    : <CustomButton
                        onClick={this.followUnfollow}> {this.state.loggedUserFollowing ? 'UNFOLLOW' : 'FOLLOW'}</CustomButton>
                }
                {user.uid === currentUser.uid
                    ?   <CustomButton type='button' onClick={() => auth.signOut()}>LOGOUT</CustomButton>
                    : null}

            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(UserInfo);