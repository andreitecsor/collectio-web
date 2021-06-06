import './active-challenge.styles.scss';
import React from "react";

const ActiveChallenge = ({activeChallenge}) => {
    console.log(activeChallenge)
    const {startedAt, lastChecked, bestRecord, timesTried, challenge} = activeChallenge;
    const startDate = Date.parse(startedAt);
    const lastCheckDate = Date.parse(lastChecked);
    let currentWeek = weeksBetween(startDate, lastCheckDate);
    return (
        <div className='active-challenge'>
            <div className='logo-container'>
                <img src={require(`../../assets/challenges/${challenge.logoUrl}`).default}
                     alt={`${challenge.title} logo`}/>
                <div>{challenge.title}</div>
            </div>
            <span className='row-item'>
                {timesTried}
            </span>
            <span className='row-item'>
                {bestRecord}
            </span>
            <span className='row-item'>
                {currentWeek}
            </span>
            <div className='check-challenge'>&#10004;</div>
            <div className='end-challenge'>&#10005;</div>
        </div>
    )
}

function weeksBetween(date1, date2) {
    return Math.round((date2 - date1) / (7 * 24 * 60 * 60 * 1000));
}

export default ActiveChallenge;