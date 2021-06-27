import './search-page.styles.scss';
import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import UserCard from "../../components/user-card/user-card.component";

class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: this.props.match.params.keyword,
            result: []
        }

    }

    componentDidMount() {
        this.getSearchedUsers();
    }

    getSearchedUsers() {
        axios.get(`http://localhost:8080/api/users/search?displayName=${this.props.match.params.keyword}&username=${this.props.match.params.keyword}`)
            .then(response => {
                if (response.data) {
                    let usersFound = response.data.filter(user => user.uid !== this.props.currentUser.uid);
                    this.setState({
                        keyword: this.props.match.params.keyword,
                        result: usersFound
                    })
                }
            })
            .catch(reason => console.warn(reason))
    }

    render() {
        if (this.state.keyword !== this.props.match.params.keyword) {
            this.getSearchedUsers();
        }
        return (
            <div className='search-page'>
                <h2>Results on: {this.props.match.params.keyword}</h2>
                {this.state.result.length === 0
                    ? (<div>No users found</div>)
                    : this.userList()
                }
            </div>
        )
    }

    userList() {
        return (<div className='results'>
            {this.state.result.map(user => <UserCard key={user.uid} user={user}/>)}
        </div>);
    }

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(withRouter(SearchPage));