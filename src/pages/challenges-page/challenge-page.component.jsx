import './challenge-page.styles.scss';
import React from 'react';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {selectAllActiveChallenges} from "../../redux/challenge/challenge.selectors";

class ChallengePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='challenge-page'>
                    <div className='title'>
                        <span>Active Challenges:</span>
                    </div>
                    <div className='active-challenges-header'>
                        <div className='header-block'>
                            <span>Challenge</span>
                        </div>
                        <div className='header-block'>
                            <span>Best Record</span>
                        </div>
                        <div className='header-block'>
                            <span>Started on</span>
                        </div>
                        <div className='header-block'>
                            <span>Current week</span>
                        </div>
                        <div className='header-block'>
                            <span>End</span>
                        </div>
                    </div>
                    {/*{*/}
                    {/*    activeChallenges.map(activeChallenge =>*/}
                    {/*        <ActiveChallenge key={activeChallenge.id} activeChallenge={activeChallenge}/>)*/}
                    {/*}*/}
                    <div className='title'>
                        <span>All Challenges:</span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    activeChallenges: selectAllActiveChallenges
});

export default connect(mapStateToProps)(ChallengePage);