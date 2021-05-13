import React from 'react';

import './homepage.styles.scss';
import Header from "../../components/header/header.component";
import CustomButton from "../../components/custom-button/custom-button.components";
import {auth} from "../../utils/firebase.utils";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";


class HomePage extends React.Component {
    render() {
        return (
            <div className='homepage'>
                <Header/>
                <CustomButton type='button' onClick={() => auth.signOut()}>LOGOUT</CustomButton>
                This is my homepage
            </div>)
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
})

export default connect(mapStateToProps)(HomePage);