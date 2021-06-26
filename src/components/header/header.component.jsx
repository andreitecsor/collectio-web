import './header.styles.scss';
import React from 'react';
import {Link} from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import {ReactComponent as Logo} from "../../assets/logo.svg";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ""
        }
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }

    render() {
        const {username, displayName} = this.props.currentUser;
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
                    <Link className="option" to='/challenges'>
                        CHALLENGES
                    </Link>
                    {
                        displayName == null
                            ? <Link className="option" to='/'>
                                PROFILE
                            </Link>
                            :
                            <Link className="option" to={`/${username}`}>
                                {displayName.toUpperCase()}
                            </Link>
                    }
                </div>
            </div>
        )
    }
}

const
    mapStateToProps = createStructuredSelector({
        currentUser: selectCurrentUser
    });

export default connect(mapStateToProps)(Header);