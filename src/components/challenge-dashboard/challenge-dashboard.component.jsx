import './challenge-dashboard.styles.scss';
import React from 'react';
import ActiveChallenge from "../active-challenge/active-challenge.component";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import axios from "axios";
import {setAllActiveChallenges} from "../../redux/challenge/challenge.actions";
import {selectAllActiveChallenges} from "../../redux/challenge/challenge.selectors";

class ChallengeDashboard extends React.Component {
    getActiveChallenges = () => {
        const {setAllActiveChallenges} = this.props;
        axios.get(`http://localhost:8080/api/joined/actives/${this.props.currentUser.uid}`)
            .then(response => {
                setAllActiveChallenges(response.data)
            })
            .catch(reason => console.log(reason));
    }

    componentDidMount() {
        this.getActiveChallenges();

    }

    render() {
        const {activeChallenges} = this.props;
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
                    activeChallenges.length === 0
                        ? <span>You haven't joined any challenge. Scroll down to check some.</span>
                        : activeChallenges.map(activeChallenge =>
                            <ActiveChallenge
                                key={activeChallenge.id}
                                activeChallenge={activeChallenge}
                                update={this.getActiveChallenges}
                                activatePopup={this.props.activatePopup}/>)
                }
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    activeChallenges: selectAllActiveChallenges
});

const mapDispatchToProps = (dispatch) => ({
    setAllActiveChallenges: (challenges) => dispatch(setAllActiveChallenges(challenges)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDashboard);