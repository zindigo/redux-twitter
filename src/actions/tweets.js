import { saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const ADD_TWEET = 'ADD_TWEET'

function addTweet(tweet) {
	return {
		type: ADD_TWEET,
		tweet
	}
}

export function handleAddTweet(tweet) {
	return (dispatch, getState) => {
		const { authedUser } = getState()

		dispatch(showLoading())
		return saveTweet({
			...tweet,
			author: authedUser
		})
			.then((tweet) => dispatch(addTweet(tweet)))
			.then(() => dispatch(hideLoading()))
	}
}

export function receiveTweets(tweets) {
	return {
		type: RECEIVE_TWEETS,
		tweets
	}
}