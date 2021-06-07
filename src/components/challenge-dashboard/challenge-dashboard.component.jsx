import './challenge-dashboard.styles.scss';
import React from 'react';
import ActiveChallenge from "../active-challenge/active-challenge.component";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import axios from "axios";

class ChallengeDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeChallenges: []
        }
        this.getActiveChallenges();
    }

    getActiveChallenges = () => {
        axios.get(`http://localhost:8080/api/joined/actives/${this.props.currentUser.uid}`)
            .then(response => this.setState({
                activeChallenges: response.data
            }))
            .catch(reason => console.log(reason));
    }

    render() {
        return (
            <div className='challenge-dashboard'>
                <div className='active-challenges-header'>
                    <div className='header-block'>
                        <span>Challenge</span>
                    </div>
                    <div className='header-block'>
                        <span>Last check</span>
                    </div>
                    <div className='header-block'>
                        <span>Best Record</span>
                    </div>
                    <div className='header-block'>
                        <span>Current week</span>
                    </div>
                    <div className='header-block'>
                        <span>Check</span>
                    </div>
                    <div className='header-block'>
                        <span>End</span>
                    </div>
                </div>
                {
                    this.state.activeChallenges.length === 0
                        ? <span>You haven't joined any challenge. Scroll down to check some.</span>
                        : this.state.activeChallenges.map(activeChallenge =>
                            <ActiveChallenge
                                key={activeChallenge.id}
                                activeChallenge={activeChallenge}
                                update={this.getActiveChallenges}/>)
                }
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});


export default connect(mapStateToProps)(ChallengeDashboard);