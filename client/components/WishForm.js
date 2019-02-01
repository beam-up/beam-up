import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Animated} from 'react-animated-css'
import {createWish} from '../store'

class WishForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      wish: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.createAWish({
      name: this.state.name,
      message: this.state.wish
    })

    this.setState({
      name: '',
      wish: ''
    })
  }

  render() {
    return (
      <div id="wishForm">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="your name">your name</label>
          <input
            value={this.state.name}
            name="name"
            type="text"
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="your wish">your wish</label>
          <input
            value={this.state.wish}
            name="wish"
            type="text"
            onChange={this.handleChange}
          />
          <br />
          <button id="wishButton" type="submit">
            Make your Wish among the Stars
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createAWish: newWish => dispatch(createWish(newWish))
  }
}

export default connect(null, mapDispatchToProps)(WishForm)