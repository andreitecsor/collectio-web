import './challenge-complete-details.styles.scss';
import React from "react";
import CustomButton from "../custom-button/custom-button.components";
import StageDetails from "../stage-details/stage-details.component";

class ChallengeCompleteDetails extends React.Component {

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
                    <CustomButton>Join now</CustomButton>
                </div>
            </div>
        )
    }

}

export default ChallengeCompleteDetails;