import React from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { withRouter } from 'react-router'

class AddTweet extends React.Component {
	state = {
		text: '',
		replyingTo: ''
	}
	isDisabled = () => {
		const { text } = this.state

		return text === ''
	}
	handleInputChange = (e) => {
		const { value } = e.target

		this.setState(() =>({
			text: value,
			replyingTo: this.props.replyingTo
		}))
	}
	handleSubmit = (e) => {
		e.preventDefault()
		if (this.state.replyingTo === undefined) {
			this.props.history.push('/')
		}
		this.props.dispatch(handleAddTweet(this.state))

		// reset the input field
		this.setState(() => ({
			text: ''
		}))
	}
	render() {
		const { text } = this.state

		return (
		    <form className='new-tweet' onSubmit={this.handleSubmit}>
			    <h3 className='center'>Compose new Tweet</h3>
			    <textarea
			    	className='textarea'
			    	onChange={this.handleInputChange}
			    	value={text}
			    	placeholder="What's happening?">
			    </textarea>
			    <button className='btn' type='submit' disabled={this.isDisabled()}>Submit</button>
		    </form>
		)
	}
}


export default withRouter(connect()(AddTweet))