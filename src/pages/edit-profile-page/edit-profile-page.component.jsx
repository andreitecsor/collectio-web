import './edit-profile-page.styles.scss';
import React from 'react';
import FormInput from "../../components/form-input/form-input.component";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import {setCurrentUser} from "../../redux/user/user.actions";
import CustomButton from "../../components/custom-button/custom-button.components";
import axios from "axios";
import swal from "sweetalert";

class EditProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: this.props.currentUser.displayName
        }
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }

    handleSubmit() {
        axios.put(`http://localhost:8080/api/users/${this.props.currentUser.uid}`,
            {
                displayName: this.state.displayName
            })
            .then(response => {
                this.setState({
                    displayName: response.data.displayName
                })
                this.props.setCurrentUser(response.data)
            })
            .catch(reason => {
                swal({
                    title: "Update failed",
                    icon: "error",
                    button: "Continue",
                })
            })
    }

    render() {
        return (
            <div className='edit-profile-page'>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={this.state.displayName}
                        onChange={this.handleChange}
                        label="Display Name"
                        required
                    />
                    <CustomButton onClick={() => this.handleSubmit()} isGoogleSingIn>SAVE</CustomButton>
            </div>
        )
    }

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);