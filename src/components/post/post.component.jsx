import React from "react";
import './post.styles.scss';

class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {date} = this.props.post;
        let completeDate = date.substring(0, 10);
        completeDate += " ";
        completeDate += date.substring(11, 16);
        return (
            <div className='post'>
                <div className='message'>
                    <span className='date'>
                        {completeDate}
                    </span>
                    {
                        this.selectPost(this.props.post)
                    }
                </div>
            </div>
        )
    }

    selectPost(post) {
        const {author, following, challenge, stage} = post;
        console.log(post)
        switch (post.postType) {
            case 'FOLLOW':
                return (<div>
                    <span>{author.displayName}</span>
                    <span> started following </span>
                    <span>{following.displayName}</span>
                </div>)
            case 'CHALLENGE':
                return (<div>
                    <span>{author.displayName}</span>
                    <span> joined </span>
                    <span>{challenge.title}</span>
                    {/*<span>{challenge.logoUrl}</span>*/}
                </div>)
            case 'AWARD':
                return (<div>
                    <span>{author.displayName}</span>
                    <span>{challenge.title}</span>
                    <span>{stage.weeksCondition}</span>
                    {/*<span>{stage.badgeUrl}</span>*/}
                </div>)
            default:
                return <span>Error</span>
        }
    }
}

export default Post;