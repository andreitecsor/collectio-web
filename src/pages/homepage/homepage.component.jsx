import React from 'react';

import './homepage.styles.scss';
import Header from "../../components/header/header.component";
import CustomButton from "../../components/custom-button/custom-button.components";
import {auth} from "../../utils/firebase.utils";


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        return (
            <div className='homepage'>
                <Header/>
                <CustomButton type='button' onClick={() => auth.signOut()}>LOGOUT</CustomButton>
                This is my homepage
            </div>)
    }
}


export default HomePage;