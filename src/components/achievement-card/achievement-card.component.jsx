import './achievement-card.styles.scss';
import React from "react";

class AchievementCard extends React.Component {
    render() {
        const {achievement} = this.props;
        return (
            <div className='card-container'>
                <img
                    src={require(`../../assets/badges/${achievement.reach.stage.badgeUrl}`).default}
                    alt={`${achievement.join.challenge.title} stage logo`}/>
                <h3>Best record : {achievement.join.bestRecord}</h3>
                <h3>Times tried : {achievement.join.timesTried}</h3>
                <h3>Last achieved on : {achievement.reach.completedAt}</h3>
            </div>
        )
    }
}

export default AchievementCard;