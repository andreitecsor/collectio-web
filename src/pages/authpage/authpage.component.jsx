import React from 'react';
import './authpage.styles.scss';
import SignIn from "../../components/sign-in/sign-in.component";
import {ReactComponent as AuthLogo} from '../../assets/auth_logo.svg';
import SignUp from "../../components/sign-up/sign-up.component";

class AuthPage extends React.Component {
    constructor() {
        super();

        this.state = {
            isLogin: true
        }
    }

    render() {
        return (
            <div className='auth'>
                <div className='auth-logo-container'>
                    <AuthLogo className='auth-logo'/>
                </div>
                <div className='auth-form'>
                    {this.state.isLogin ?
                        <SignIn/>
                        :
                        <SignUp/>}
                </div>
            </div>)

    }

}

export default AuthPage;


