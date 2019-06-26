import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import Tweet from './Tweet'
import Tweets from './Tweets'
import AddTweet from './AddTweet'
import LoadingBar from 'react-redux-loading-bar'

class App extends Component {
	componentDidMount() {
		const { dispatch } = this.props
		dispatch(handleInitialData())
	}
	render() {
	    return (
	         <Router>
			    <Fragment>
			    	<LoadingBar />
				    <div className='container'>
				       	<Nav />
				        {this.props.loading === true
				    		? null
				    		: <div>
				    			<Route path='/' exact component={Tweets} />
				    			<Route path='/new' component={AddTweet} />
				    			<Route path='/tweet/:id' component={Tweet} />
				    		  </div>
				    	}
				    </div>
				</Fragment>
			</Router>
	    )
  }
}

function mapStateToProps({ authedUser }) {
	return {
		loading: authedUser === null
	}
}

export default connect(mapStateToProps)(App)