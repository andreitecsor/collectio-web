import './achievement-card.styles.scss';
import React from "react";

class AchievementCard extends React.Component {
    render() {
        const {achievement} = this.props;
        return (
            <div className='achievement-card'>
                <img
                    src={require(`../../assets/badges/${achievement.reach.stage.badgeUrl}`).default}
                    alt={`${achievement.join.challenge.title} stage logo`}/>
                <p>{achievement.reach.completedAt}</p>
                <p>Best record: {achievement.join.bestRecord} {achievement.join.bestRecord === 1 ? 'week' : 'weeks'}</p>
                <p>Times tried: {achievement.join.timesTried}</p>
            </div>
        )
    }
}

export default AchievementCard;