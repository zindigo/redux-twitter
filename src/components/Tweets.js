import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import { handleLikeTweet } from '../actions/tweets'

class Tweets extends React.Component {
	handleReplyToClick = (e, tweetId) => {
		e.preventDefault();
		this.props.history.push('/tweet/'+ tweetId)
	}
	handleHeartClick = (e, tweet) => {
		e.preventDefault();
		const { dispatch, authedUser } = this.props
		// save change
		dispatch(handleLikeTweet(tweet))
	}
	getReplyToTweet(tweetId) {
		const { allTweets, users } = this.props
		return allTweets.find((tweet) => {
			return tweet.id === tweetId
		})
	}
	isLiked(tweet) {
		const { authedUser } = this.props

		// check to see if auth user is in likes array
		return tweet.likes.find((likedBy) => {
			return likedBy === authedUser
		})
	}
	render() {
		const { allTweets, users } = this.props
		console.log('tweets', allTweets)
		console.log('users', users)

		return (
		    <div>
		    <h3 className='center'>Your Timeline</h3>
		    <ul className='dashboard-list'>
		    { allTweets.map((tweet) => (
		    	<li key={tweet.id}>
		    		<Link className='tweet' to={`/tweet/${tweet.id}`}>
		    		<img src={users[tweet.author].avatarURL} alt='Avatar of {users[tweet.author].name}' className='avatar' />
		    		<div className='tweet-info'>
		    			<div>
			    			<span>{users[tweet.author].name}</span>
			    			<span></span>
			    			<div>{formatDate(tweet.timestamp)}</div>
			    			{ tweet.replyingTo &&
			    			<button className='replying-to' onClick={(e) => this.handleReplyToClick(e, tweet.replyingTo)}>
			    				Replying to @{this.getReplyToTweet(tweet.replyingTo).author}
			    			</button>
			    			}
			    			<p>{tweet.text}</p>
		    			</div>
		    			<div className='tweet-icons'>
							<svg className='tweet-icon' viewBox='0 0 20 20'>
								<path d="M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z"></path>
							</svg>
							<span>{tweet.replies.length > 0 && tweet.replies.length}</span>
							<button className='heart-button' onClick={(e) => this.handleHeartClick(e, tweet)}>
								{ this.isLiked(tweet) ?
									<svg className='tweet-icon is-check'>
										<path d="M16,28.261c0,0-14-7.926-14-17.046c0-9.356,13.159-10.399,14-0.454c1.011-9.938,14-8.903,14,0.454 C30,20.335,16,28.261,16,28.261z"/>
								    </svg>
							    	:
							    	<svg className='tweet-icon is-outlined'>
										<path d="M16,28.261c0,0-14-7.926-14-17.046c0-9.356,13.159-10.399,14-0.454c1.011-9.938,14-8.903,14,0.454 C30,20.335,16,28.261,16,28.261z"/>
							   		</svg>
								}
							</button>
							<span>{tweet.likes.length > 0 && tweet.likes.length}</span>
						</div>
		    		</div>
		    		</Link>
		    	</li>
		    	))}
		    </ul>
		    </div>
		)
	}
}

function mapStateToProps({ authedUser, tweets, users }) {

	const allTweets = Object.keys(tweets)
		.map((id) => tweets[id])
		.sort((a,b) => b.timestamp - a.timestamp)

	return {
		allTweets,
		users,
		authedUser
	}
}

export default connect(mapStateToProps)(Tweets)