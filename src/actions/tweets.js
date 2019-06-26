import { saveTweet, saveLikeToggle } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const ADD_TWEET = 'ADD_TWEET'
export const TOGGLE_TWEET_LIKES = 'TOGGLE_TWEET_LIKES'

function addTweet(tweet) {
	return {
		type: ADD_TWEET,
		tweet
	}
}

function toggleTweetLikes(tweet, authedUser, hasLiked) {
	return {
		type: TOGGLE_TWEET_LIKES,
		tweet,
		authedUser,
		hasLiked
	}
}

export function receiveTweets(tweets) {
	return {
		type: RECEIVE_TWEETS,
		tweets
	}
}

export function handleAddTweet(tweet) {
	return (dispatch, getState) => {
		const { authedUser } = getState()

		dispatch(showLoading())
		return saveTweet({
			text: tweet.text,
			author: authedUser
		})
			.then((tweet) => dispatch(addTweet(tweet)))
			.then(() => dispatch(hideLoading()))
	}
}

export function handleLikeTweet(tweet) {
	return (dispatch, getState) => {
		const { authedUser } = getState()

		dispatch(toggleTweetLikes(tweet, authedUser, !tweet.likes.includes(authedUser)))

		return saveLikeToggle({
			id: tweet.id,
			hasLiked: !tweet.likes[authedUser],
			authedUser: authedUser
		})
			.catch(() => {
				dispatch(toggleTweetLikes(tweet, authedUser, !tweet.likes.includes(authedUser)))
				alert('An error occurred. Try again.')
			})
	}
}

