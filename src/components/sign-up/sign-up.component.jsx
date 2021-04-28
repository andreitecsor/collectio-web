import './sign-up.styles.scss';

import React from 'react';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.components";

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }

    render() {
        return (
            <div className='sign-up'>
                <h2>Sign up</h2>
                <span>Already a member? Log in now</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={this.state.displayName}
                        onChange={this.handleChange}
                        label="Display Name"
                        required
                    />
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