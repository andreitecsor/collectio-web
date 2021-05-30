import './header.styles.scss';
import React from 'react';
import {Link} from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import {ReactComponent as Logo} from "../../assets/logo.svg";

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            search: ""
        }
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }

    render() {
        return (
            <div className='header'>
                <Link to='/'>
                    <Logo className='logo-container'/>
                </Link>

                <div className="options">
                    <div className="option">
                        <FormInput
                            name='search'
                            type='text'
                            value={this.state.search}
                            handleChange={this.handleChange}
                            label='Search'
                        />
                    </div>
                    <Link className="option" to='/'>
                        CHALLENGES
                    </Link>
                    <Link className="option" to='/'>
                        PROFILE
                    </Link>
                </div>
            </div>
        )
    }
}
export default Header;