import { RECEIVE_TWEETS, ADD_TWEET, TOGGLE_TWEET_LIKES } from '../actions/tweets'

export default function tweets (state = {}, action) {
  switch(action.type) {
    case RECEIVE_TWEETS :
    	return {
    		...state,
    		...action.tweets
    	}
    case ADD_TWEET:
    	return {
    		...state,
    		[action.tweet.id]: action.tweet
    	}
    case TOGGLE_TWEET_LIKES:
    	const { tweet, hasLiked, authedUser } = action
    	let likesArray = []

    	if (hasLiked === true) {
    		likesArray = tweet.likes.concat([authedUser])
    	}
    	else {
    		likesArray = tweet.likes.filter((user) => user !== authedUser)
    	}

		return {
			...state,
			[tweet.id]: {
				...tweet,
				likes: likesArray
			}
		}

    default :
      return state
  }
}