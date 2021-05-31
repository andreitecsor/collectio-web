import './newsfeed.styles.scss';
import React from "react";
import Post from "../post/post.component";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import axios from "axios";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";

class Newsfeed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            posts: [],
            allPostsShown: false
        }
    }

    componentDidMount() {
        this.getNewsfeedPosts();
    }

    getNewsfeedPosts() {
        axios.get(`http://localhost:8080/api/posts/newsfeed/public?user=${this.props.currentUser.uid}&page=${this.state.page}`)
            .then(response => {
                console.log(response);
                if (response.data.length > 0) {
                    this.setState({
                        posts: this.state.posts.push(response.data),
                        page: this.state.page + 1
                    })
                } else {
                    this.setState({
                        allPostsShown: true
                    })
                }
            })
            .catch(reason => console.log(reason))
    }

    render() {
        return (
            <div className='newsfeed'>
                <div className='title'>What's new</div>
                <div className='connector'>|</div>
                {}
                {/*TODO:Foreach post data generate a post*/}
                <Post/>
                <div className='connector'>|</div>
                {this.state.allPostsShown
                    ? <div className='title'>Nothing new here</div>
                    : <button onClick={() => this.getNewsfeedPosts()}>Show more</button>
                }
            </div>)
    }

}

const
    mapStateToProps = createStructuredSelector({
            currentUser: selectCurrentUser
        }
    );


export default connect(mapStateToProps)(Newsfeed);