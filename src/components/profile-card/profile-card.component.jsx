import React from "react";
import './profile-card.styles.scss';
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";

class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {displayName, username} = this.props.currentUser;
        return (
            <div className='profile-card'>
                <img src={`https://robohash.org/${username}?set=set1`} width='150' height='150'
                     alt='Profile avatar'/>
                <div>{displayName}</div>
                <hr/>
                <div>Active Challenges : 0</div>
                <hr/>
                <div>People influenced : 0</div>
            </div>
        )
    }
}

const
    mapStateToProps = createStructuredSelector({
            currentUser: selectCurrentUser
        }
    );


export default connect(mapStateToProps)(ProfileCard);