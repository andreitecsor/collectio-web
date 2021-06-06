import './challenge-page.styles.scss';
import React from 'react';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {selectAllChallenges} from "../../redux/challenge/challenge.selectors";
import ChallengeDashboard from "../../components/challenge-dashboard/challenge-dashboard.component";

class ChallengePage extends React.Component {
    render() {
        return (
            <div className='challenge-page'>
                <ChallengeDashboard/>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    allChallenges: selectAllChallenges
});

export default connect(mapStateToProps)(ChallengePage);