import './challenge-complete-details.styles.scss';
import React from "react";
import CustomButton from "../custom-button/custom-button.components";
import StageDetails from "../stage-details/stage-details.component";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import axios from "axios";
import swal from "sweetalert";

class ChallengeCompleteDetails extends React.Component {

    joinChallenge(challenge) {
        axios.put(`http://localhost:8080/api/joined/${this.props.currentUser.uid}->${challenge.id}`)
            .then(response =>
                swal({
                    title: "Challenge joined!",
                    text: `You joined ${challenge.title} challenge`,
                    icon: "success",
                    button: "Continue"
                })
            )
            .catch(reason =>
                swal({
                    title: "You are already in this challenge",
                    icon: "error",
                    button: "Continue"
                })
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
        const {challenge} = this.props;
        const {stages} = challenge;
        return (
            <div className='challenge-complete-details'>
                <h2> {challenge.title}</h2>
                <p> {challenge.description}</p>
                {
                    this.setStage(stages)
                }
                <div className='button'>
                    <CustomButton onClick={() => this.joinChallenge(challenge)}>Join now</CustomButton>
                </div>
            </div>
        )
    }

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(ChallengeCompleteDetails);