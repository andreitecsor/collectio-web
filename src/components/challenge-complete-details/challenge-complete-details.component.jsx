import './challenge-complete-details.styles.scss';
import React from "react";
import CustomButton from "../custom-button/custom-button.components";

class ChallengeCompleteDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {challenge} = this.props;
        return (
            <div className='challenge-complete-details'>
                <h2> {challenge.title}</h2>
                <img
                    src={require(`../../assets/challenges/${challenge.logoUrl}`).default}
                    alt={`${challenge.title} logo`}/>
                <p> {challenge.description}</p>
                <h2>Stages:</h2>
                <CustomButton>Join now</CustomButton>
            </div>
        )
    }

}

export default ChallengeCompleteDetails;