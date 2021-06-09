import React from "react";
import './profile-card.styles.scss';
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import {selectAllActiveChallenges} from "../../redux/challenge/challenge.selectors";

class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
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
                <div>Challenges started because of you : 0</div>
                <hr/>
                <div>People influenced : 0</div>
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