import React from 'react';
import './challenge-list.styles.scss';
import {createStructuredSelector} from "reselect";
import {selectAllChallenges} from "../../redux/challenge/challenge.selectors";
import {connect} from "react-redux";
import ChallengeCard from "../challenge-card/challenge-card.component";

const ChallengeList = ({allChallenges, activatePopup}) => (
    <div className='challenge-list'>
        {allChallenges.map(challenge => (
            <ChallengeCard key={challenge.id} challenge={challenge} activatePopup={activatePopup}/>
        ))}
    </div>
)


const mapStateToProps = createStructuredSelector({
    allChallenges: selectAllChallenges
});


export default connect(mapStateToProps)(ChallengeList);