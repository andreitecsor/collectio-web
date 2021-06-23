import './personal-activity-feed.styles.scss';
import React from "react";
import Post from "../post/post.component";
import axios from "axios";
import CustomButton from "../custom-button/custom-button.components";

class PersonalActivityFeed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            page: this.props.pageNumber,
            posts: [],
            allPostsShown: false
        }
    }

    getPersonalActivityPosts() {
        axios.get(`http://localhost:8080/api/posts/newsfeed/personal?user=${this.state.user.uid}&page=${this.state.page}`)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        posts: this.state.posts.concat(response.data),
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
        if (this.state.user !== this.props.user) {
            this.setState({
                page: 0,
                posts: [],
                user: this.props.user
            })
        }
        const {posts} = this.state;
        console.log(this.state)
        return (
            <div>
                <div>BADGES</div>
                <div className='newsfeed'>
                    {
                        posts.map(post => (
                            <div className='newsfeed'>
                                <Post key={post.postId} post={post} activatePopup={this.props.activatePopup}/>
                                <div className='connector'>|</div>
                            </div>
                        ))
                    }
                    {this.state.allPostsShown
                        ? <div className='title'>That's all for now</div>
                        : <CustomButton onClick={() => this.getPersonalActivityPosts()}>Activity</CustomButton>
                    }
                </div>
            </div>)

    }
}

export default PersonalActivityFeed;