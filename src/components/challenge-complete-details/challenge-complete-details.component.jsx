import './challenge-complete-details.styles.scss';
import React from "react";
import CustomButton from "../custom-button/custom-button.components";
import StageDetails from "../stage-details/stage-details.component";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import axios from "axios";
import swal from "sweetalert";
import {setAllActiveChallenges} from "../../redux/challenge/challenge.actions";

class ChallengeCompleteDetails extends React.Component {

    getActiveChallenges = () => {
        const {setAllActiveChallenges} = this.props;
        axios.get(`http://localhost:8080/api/joined/actives/${this.props.currentUser.uid}`)
            .then(response => {
                setAllActiveChallenges(response.data)
                this.props.deactivatePopup()
            })
            .catch(reason => console.log(reason));
    }

    joinChallenge(challenge) {
        axios.put(`http://localhost:8080/api/joined/${this.props.currentUser.uid}->${challenge.id}`)
            .then(response => {
                    swal({
                        title: "Challenge joined!",
                        text: `You joined ${challenge.title} challenge`,
                        icon: "success",
                        button: "Continue"
                    });
                    this.getActiveChallenges();
                }
            )
            .catch(reason =>
                swal({
                    title: "You are already in this challenge",
                    icon: "error",
                    button: "Continue"
                })
            )
    }

    joinChallengeWithInfluencer(challenge) {
        axios.put(`http://localhost:8080/api/joined/${this.props.currentUser.uid}->${challenge.id}/influencedBy=${this.props.influencerId}`)
            .then(response => {
                    swal({
                        title: "Challenge joined!",
                        text: `You joined ${challenge.title} challenge`,
                        icon: "success",
                        button: "Continue"
                    });
                    this.getActiveChallenges();
                }
            )
            .catch(reason => {
                    console.log(reason);
                    swal({
                        title: "You are already in this challenge",
                        icon: "error",
                        button: "Continue"
                    })
                }
            )
    }

    setStage(stages) {
        let stagesElements = [];
        stagesElements.push(<StageDetails stage={stages[0]} prevWeeksCondition={0}/>);
        for (let i = 1; i < stages.length; i++) {
            let prevWeeksCondition = stages[i - 1].weeksCondition;
            stagesElements.push(<StageDetails stage={stages[i]} prevWeeksCondition={prevWeeksCondition}/>);
        }
        return stagesElements;
    }

    render() {
        const {challenge, influencerId} = this.props;
        const {stages} = challenge;
        return (
            <div className='challenge-complete-details'>
                <h2> {challenge.title}</h2>
                <p> {challenge.description}</p>
                {
                    this.setStage(stages)
                }
                <div className='button'>
                    {
                        influencerId
                            ? <CustomButton onClick={() => this.joinChallengeWithInfluencer(challenge)}>Join
                                now</CustomButton>
                            : <CustomButton onClick={() => this.joinChallenge(challenge)}>Join now</CustomButton>

                    }
                </div>
            </div>
        )
    }

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
    setAllActiveChallenges: (challenges) => dispatch(setAllActiveChallenges(challenges)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCompleteDetails);