import './sign-up.styles.scss';

import React from 'react';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.components";
import {auth} from "../../utils/firebase.utils";

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        try {
            await auth.createUserWithEmailAndPassword(email, password);
            this.setState({
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            alert("email already used");
            console.error(error);
        }
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }

    render() {
        return (
            <div className='sign-up'>
                <h2>Sign up</h2>
                <span>Already a member?
                    <span className='switch-form' onClick={this.props.switchForm}>Log in now</span>
                </span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type='email'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        label="Email"
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        label="Confirm password"
                        required
                    />
                    <CustomButton type='submit'>Create an account</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;