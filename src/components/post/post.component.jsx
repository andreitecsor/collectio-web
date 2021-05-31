import React from "react";
import './post.styles.scss';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const timeAgo = new TimeAgo('en-US')
        const actualDate = Date.parse(this.props.post.date);
        return (
            <div className='post'>
                <div className='message'>
                    <span className='date'>
                        {timeAgo.format(actualDate)}
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