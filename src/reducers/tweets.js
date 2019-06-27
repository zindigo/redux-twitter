import { RECEIVE_TWEETS, ADD_TWEET, ADD_REPLY, TOGGLE_TWEET_LIKES } from '../actions/tweets'

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
    case ADD_REPLY:
    	var { parentTweet, childTweet } = action

		return {
			...state,
			[parentTweet.id]: {
				...parentTweet,
				replies: parentTweet.replies.concat([childTweet.id])
			}
		}
    case TOGGLE_TWEET_LIKES:
    	var { tweet, hasLiked, authedUser } = action

    	let likesArray = (hasLiked === true)
    		? tweet.likes.concat([authedUser])
    		: tweet.likes.filter((user) => user !== authedUser)

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