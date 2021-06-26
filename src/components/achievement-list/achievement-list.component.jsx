import './achievement-list.styles.scss';
import React from 'react';
import axios from "axios";
import AchievementCard from "../achievement-card/achievement-card.component";


class AchievementList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            achievements: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/joined/achievements/${this.props.user.uid}`)
            .then(response => this.setState({
                achievements: response.data
            }))
            .catch(reason => console.log(reason))
    }

    render() {
        console.log(this.state.achievements)
        return (<div className='achievement-list'>
            {
                this.state.achievements.length === 0
                    ? ""
                    :
                    <div>
                        <div className='title'>Achievements:</div>
                        {this.state.achievements.map(achievement => <AchievementCard
                            key={achievement.join.id + achievement.reach.id}
                            achievement={achievement}/>)}
                    </div>
            }
        </div>)
    }
}

export default AchievementList;
