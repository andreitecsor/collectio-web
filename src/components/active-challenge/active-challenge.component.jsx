import './active-challenge.styles.scss';
import React from "react";
import weeksBetween from "../../utils/functions.utils";
import axios from "axios";

class ActiveChallenge extends React.Component {
    render() {
        const startDate = Date.parse(this.props.activeChallenge.startedAt);
        const lastCheckDate = Date.parse(this.props.activeChallenge.lastChecked);
        let currentWeek = weeksBetween(startDate, lastCheckDate);
        return (
            <div className='active-challenge'>
                <div className='logo-container'>
                    <img
                        src={require(`../../assets/challenges/${this.props.activeChallenge.challenge.logoUrl}`).default}
                        alt={`${this.props.activeChallenge.challenge.title} logo`}/>
                    <div>{this.props.activeChallenge.challenge.title}</div>
                </div>
                <span className='row-item'>
                    {this.props.activeChallenge.lastChecked}
                </span>
                <span className='row-item'>
                    {this.props.activeChallenge.bestRecord}
                </span>
                <span className='row-item'>
                    {currentWeek}
                </span>
                <div className='check-challenge'onClick={this.checkChallenge}>&#10004;</div>
                <div className='end-challenge' onClick={this.endChallenge}>&#10006;</div>
            </div>)
    }

    checkChallenge = () => {
        const {user, challenge} = this.props.activeChallenge;
        axios.put(`http://localhost:8080/api/joined/check/${user.uid}->${challenge.id}`)
            .then(() => this.props.update())
            .catch(reason => alert("You cannot check your challenge yet. Wait four days after last check."))
    }

    endChallenge = () => {
        const {user, challenge} = this.props.activeChallenge;
        axios.put(`http://localhost:8080/api/joined/end/${user.uid}->${challenge.id}`)
            .then(() => this.props.update())
            .catch(reason => console.log(reason))
    }
}


export default ActiveChallenge;