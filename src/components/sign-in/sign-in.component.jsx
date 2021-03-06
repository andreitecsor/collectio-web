import './sign-in.styles.scss';

import React from 'react';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.components";
import {auth, SignInWithGoogle} from "../../utils/firebase.utils";
import swal from 'sweetalert';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {email, password} = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''});
        } catch (err) {
            swal({
                title: "Invalid email or password",
                text: "The email or password you have entered is incorrect or does not exists",
                icon: "error",
                button: "Try again",
            });
            console.log(err);
        }
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>Sign in</h2>
                <span>New to collectio?
                   <span className='switch-form' onClick={() => this.props.switchForm()}>Join us now</span>
                </span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label='Email'
                        required/>
                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label='Password'
                        required/>
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton onClick={SignInWithGoogle} type='button' isGoogleSingIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                    <span className='utility-text'
                          onClick={() => this.triggerForgotPassword()}>Forgot your password?</span>
                </form>
            </div>
        )
    }

    triggerForgotPassword() {
        if (this.state.email.length === 0) {
            swal({
                title: "Please write your email in the email box",
                icon: "warning",
                button: "Continue"
            })
        } else {
            auth.sendPasswordResetEmail(this.state.email)
                .then(response => swal({
                    title: "Recovery email sent",
                    icon: "success",
                    button: "Continue"
                }))
                .catch(reason => swal({
                    title: "Invalid email address",
                    icon: "error",
                    button: "Continue"
                }))
        }
    }
}

export default SignIn;