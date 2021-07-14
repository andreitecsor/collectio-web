import './challenge-page.styles.scss';
import React from 'react';
import ChallengeDashboard from "../../components/challenge-dashboard/challenge-dashboard.component";
import ChallengeList from "../../components/challlenge-list/challenge-list.component";
import PopUp from "../../components/pop-up/pop-up.component";
import ChallengeCompleteDetails from "../../components/challenge-complete-details/challenge-complete-details.component";

class ChallengePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show_popup: false,
            challenge: null
        }

    }

    render() {
        return (
            <div className='challenge-page'>
                <div className='title'>
                    <span>Active Challenges:</span>
                </div>
                <ChallengeDashboard activatePopup={this.activatePopup}/>
                <div className='title'>
                    <span>All Challenges:</span>
                </div>
                <ChallengeList activatePopup={this.activatePopup}/>
                <PopUp trigger={this.state.show_popup} close={this.deactivatePopup}>
                    {this.state.challenge
                        ? <ChallengeCompleteDetails challenge={this.state.challenge}
                                                    deactivatePopup={this.deactivatePopup}/>
                        : ""}
                </PopUp>
            </div>
        )
    }

    activatePopup = (challenge) => {
        this.setState({
            show_popup: true,
            challenge: challenge
        })
    }

    deactivatePopup = () => {
        this.setState({
            show_popup: false,
            challenge: null
        })
    }
}

export default ChallengePage;