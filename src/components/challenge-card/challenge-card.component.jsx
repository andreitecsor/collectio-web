import React from 'react';
import './challenge-card.styles.scss';

class ChallengeCard extends React.Component {
    render() {
        const {challenge} = this.props;
        return (
            <div className='card-container' onClick={() => this.props.activatePopup(challenge)}>
                <img
                    src={require(`../../assets/challenges/${challenge.logoUrl}`).default}
                    alt={`${challenge.title} logo`}/>
                <h2> {challenge.title}</h2>
                <p> {challenge.description}</p>
            </div>
        )
    }
}

export default ChallengeCard;