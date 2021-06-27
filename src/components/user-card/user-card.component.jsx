import './user-card.styles.scss';
import React from "react";
import {withRouter} from "react-router-dom";

class UserCard extends React.Component {

    goToProfile() {
        this.props.history.push(`/profile/${this.props.user.username}`)
    }

    render() {
        const {user} = this.props;
        return (
            <div className='user-card' onClick={() => this.goToProfile()}>
                <img src={`https://robohash.org/${user.username}?set=set1`} width='150' height='150'
                     alt='Profile avatar'/>
                <h2>{user.displayName}</h2>
            </div>
        )
    }
}

export default withRouter(UserCard);