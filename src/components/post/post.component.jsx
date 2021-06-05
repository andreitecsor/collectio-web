import React from "react";
import './post.styles.scss';
import TimeAgo from 'javascript-time-ago';


class Post extends React.Component {
    render() {
        const timeAgo = new TimeAgo('en-US')
        const actualDate = Date.parse(this.props.post.date);
        return (
            <div className='post'>
                {
                    this.selectPost(this.props.post)
                }
                {
                    this.selectIcon(this.props.post)
                }
                <div className='date'>
                    {timeAgo.format(actualDate)}
                </div>
            </div>
        )
    }

    selectPost(post) {
        const {author, following, challenge, stage} = post;
        switch (post.postType) {
            case 'FOLLOW':
                return (
                    <div className='message'>
                        <img src={`https://robohash.org/${author.username}?set=set1`} width='35' height='35'
                             alt={`${author.username} generated avatar`}/>
                        <span> {author.displayName}</span>
                        <span> started following </span>
                        <img src={`https://robohash.org/${following.username}?set=set1`} width='35' height='35'
                             alt={`${following.username} generated avatar`}/>
                        <span> {following.displayName}</span>
                    </div>)
            case 'CHALLENGE':
                return (<div className='message'>
                    <img src={`https://robohash.org/${author.username}?set=set1`} width='35' height='35'
                         alt={`${author.username} generated avatar`}/>
                    <span> {author.displayName}</span>
                    <span> joined the </span>
                    <span>{challenge.title}</span>
                    <span> challenge </span>
                </div>)
            case 'AWARD':
                return (<div className='message'>
                    <img src={`https://robohash.org/${author.username}?set=set1`} width='35' height='35'
                         alt={`${author.username} generated avatar`}/>
                    <span> {author.displayName}</span>
                    <span> completed {stage.weeksCondition} {stage.weeksCondition === 1? "week" : "weeks" } in the </span>
                    <span>{challenge.title}</span>
                    <span> challenge </span>
                </div>)
            default:
                return <span>Error Loading Message</span>
        }
    }

    selectIcon(post) {
        const {challenge, stage} = post;
        switch (post.postType) {
            case 'FOLLOW':
                return (
                    <div className='image'>
                        <img src={require('../../assets/friends-bagde.svg').default} alt='Friends logo'/>
                    </div>)
            case 'CHALLENGE':
                return (
                    <div className='image'>
                        <img src={require(`../../assets/challenges/${challenge.logoUrl}`).default}
                             alt={`${challenge.title} logo`}/>
                    </div>)
            case 'AWARD':
                return (
                    <div className='image'>
                        <img src={require(`../../assets/badges/${stage.badgeUrl}`).default}
                             alt={`${challenge.title} ${stage.weeksCondition} weeks badge`}/>
                    </div>)
            default:
                return <span/>
        }
    }
}

export default Post;