import './stage-details.styles.scss';
import React from "react";

const StageDetails = ({stage, prevWeeksCondition}) => {
    const weeks = stage.weeksCondition - prevWeeksCondition;
    return (
        <div className='stage-details'>
            <hr/>
            <div className='stage-row'>
                <div className='to-complete'>
                    <li>
                        For the next {weeks === 1 ? "" : weeks} {weeks === 1 ? "week" : "weeks"}:
                    </li>
                    <span className='to-do'>
                        {stage.description}
                    </span>
                </div>
                <div className='award'>
                    <img src={require(`../../assets/badges/${stage.badgeUrl}`).default}
                         alt={`${stage.weeksCondition} weeks badge`}/>
                    <span>Unlock on week: {stage.weeksCondition}</span>
                </div>
            </div>
        </div>
    )
}

export default StageDetails;