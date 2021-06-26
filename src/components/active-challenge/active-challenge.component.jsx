import './active-challenge.styles.scss';
import React from "react";
import weeksBetween from "../../utils/functions.utils";
import axios from "axios";
import swal from 'sweetalert';
import {createStructuredSelector} from "reselect";
import {selectAllChallenges} from "../../redux/challenge/challenge.selectors";
import {connect} from "react-redux";

class ActiveChallenge extends React.Component {
    render() {
        const {allChallenges} = this.props;
        const {startedAt, lastChecked, challenge, bestRecord} = this.props.activeChallenge;
        let currentWeek = weeksBetween(startedAt, lastChecked);
        const challengeWithStages = allChallenges.find(challengeWithStages => challengeWithStages.id === challenge.id);
        return (
            <div className='active-challenge'>
                <div className='logo-container' onClick={() => this.props.activatePopup(challengeWithStages)}>
                    <img
                        src={require(`../../assets/challenges/${challenge.logoUrl}`).default}
                        alt={`${challenge.title} logo`}/>
                    <div>{challenge.title}</div>
                </div>
                <span className='row-item'>
                    {lastChecked}
                </span>
                <span className='row-item'>
                    {bestRecord}
                </span>
                <span className='row-item'>
                    {currentWeek}
                </span>
                <div className='check-challenge' onClick={this.checkChallenge}>&#10004;</div>
                <div className='end-challenge' onClick={this.endChallenge}>&#10006;</div>
            </div>)
    }

    checkChallenge = () => {
        const {user, challenge} = this.props.activeChallenge;
        axios.put(`http://localhost:8080/api/joined/check/${user.uid}->${challenge.id}`)
            .then(() => this.props.update())
            .catch(reason => swal({
                title: "Invalid check time",
                text: "You cannot check your challenge yet. Wait four days after last check.",
                icon: "warning",
                button: "Continue",
            }))
    }

    endChallenge = () => {
        const {user, challenge} = this.props.activeChallenge;
        swal({
            title: "Are you sure?",
            text: "Once ended, you will lose all your current progress!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.put(`http://localhost:8080/api/joined/end/${user.uid}->${challenge.id}`)
                        .then(() => {
                            this.props.update()
                            swal("Challenge ended successfully", {
                                icon: "success",
                            });
                        })
                        .catch(reason => console.log(reason))
                }
            });

    }
}

const mapStateToProps = createStructuredSelector({
    allChallenges: selectAllChallenges
});


export default connect(mapStateToProps)(ActiveChallenge);