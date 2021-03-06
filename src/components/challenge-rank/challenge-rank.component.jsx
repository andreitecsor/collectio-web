import React from "react";
import './challenge-rank.styles.scss';
import axios from "axios";

class ChallengeRank extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            challenges: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/challenges/all')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        challenges: this.state.challenges.concat(response.data)
                    })
                }
            })
            .catch(reason => console.log(reason))
    }

    render() {
        const {challenges} = this.state;
        return (
            <div className='challenge-rank'>
                <h3>Popular Challenges</h3>
                {
                    challenges.map(challenge =>
                        <div className='challenge' onClick={() => this.props.activatePopup(challenge)}>
                            <hr className='separator'/>
                            <img src={require(`../../assets/challenges/${challenge.logoUrl}`).default}
                                 alt={`${challenge.title} logo`}/>
                            <div className='clickable-content'>{challenge.title}</div>
                        </div>
                    )
                }
            </div>
        )
    }

}

export default ChallengeRank;