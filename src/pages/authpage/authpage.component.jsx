import React from 'react';
import './authpage.styles.scss';
import SignIn from "../../components/sign-in/sign-in.component";
import {ReactComponent as AuthLogo} from '../../assets/auth_logo.svg';

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
                        <div>Register</div>}
                </div>
            </div>)

    }

}

export default AuthPage;


