import React from 'react'
import { connect } from 'react-redux'
import AddTweet from './AddTweet'
import TweetCard from './TweetCard'

class Tweet extends React.Component {
	render() {
		const { tweets } = this.props
		const tweet = this.props.tweets[this.props.match.params.id]

		return (
		    <div>
		    	<TweetCard tweet={tweet} />
		    	<AddTweet />
		    	{ tweet.replies &&
		    		<div>
				    	<h3 className='center'>Replies</h3>
				    	{ tweet.replies.map((replyId) => (
					    	<li key={replyId}>
					    		<TweetCard tweet={tweets[replyId]} />
					    	</li>
				    	))}
			    	</div>
		    	}
		    </div>
		)
	}
}


function mapStateToProps({ tweets }) {
	return {
		tweets
	}
}

export default connect(mapStateToProps)(Tweet)