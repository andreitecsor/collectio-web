import './achievements-card.styles.scss';
import React from "react";

class AchievementsCard extends React.Component {
    render() {
        return (
            <div className='achievements-card'>
                {this.props.user.username}
            </div>
        )
    }
}

export default AchievementsCard;