import React from 'react'
import { connect } from 'react-redux'
import TweetCard from './TweetCard'

class Tweets extends React.Component {
	render() {
		const { allTweets } = this.props

		return (
		    <div>
		    <h3 className='center'>Your Timeline</h3>
		    <ul className='dashboard-list'>
		    { allTweets.map((tweet) => (
		    	<li key={tweet.id}>
		    		<TweetCard tweet={tweet} />
		    	</li>
		    	))}
		    </ul>
		    </div>
		)
	}
}

function mapStateToProps({ tweets }) {

	const allTweets = Object.keys(tweets)
		.map((id) => tweets[id])
		.sort((a,b) => b.timestamp - a.timestamp)

	return {
		allTweets
	}
}

export default connect(mapStateToProps)(Tweets)