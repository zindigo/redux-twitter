import React from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'

class AddTweet extends React.Component {
	state = {
		text: ''
	}
	isDisabled = () => {
		const { text } = this.state

		return text === ''
	}
	handleInputChange = (e) => {
		const { value } = e.target

		this.setState(() =>({
			text: value
		}))
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.history.push('/')
		this.props.dispatch(handleAddTweet(this.state))
	}
	render() {
		return (
		    <form className='new-tweet' onSubmit={this.handleSubmit}>
			    <h3 className='center'>Compose new Tweet</h3>
			    <textarea
			    	className='textarea'
			    	onChange={this.handleInputChange}
			    	placeholder="What's happening?">
			    </textarea>
			    <button className='btn' type='submit' disabled={this.isDisabled()}>Submit</button>
		    </form>
		)
	}
}


export default connect()(AddTweet)