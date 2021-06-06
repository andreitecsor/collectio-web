import './challenge-dashboard.styles.scss';
import React from 'react';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {selectAllActiveChallenges} from "../../redux/challenge/challenge.selectors";
import ActiveChallenge from "../active-challenge/active-challenge.component";

class ChallengeDashboard extends React.Component {
    render() {
        return (
            <div className='challenge-dashboard'>
                <div className='title'>
                    <span>Active Challenges:</span>
                </div>
                <div className='active-challenges-header'>
                    <div className='header-block'>
                        <span>Challenge</span>
                    </div>
                    <div className='header-block'>
                        <span>Times tried</span>
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
                    this.props.activeChallenges.map(activeChallenge =>
                        <ActiveChallenge key={activeChallenge.id} activeChallenge={activeChallenge}/>)
                }
                <div className='title'>
                    <span>All Challenges:</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    activeChallenges: selectAllActiveChallenges
});

export default connect(mapStateToProps)(ChallengeDashboard);