import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Animated} from 'react-animated-css'
import {createWish} from '../store'
import WishSubmitted from './WishSubmitted'

class WishForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      wish: '',
      submitted: false
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
      wish: '',
      submitted: true
    })
  }

  render() {
    return this.state.submitted ? (
      <WishSubmitted />
    ) : (
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <div id="wishForm">
          <h1>send a wish to the stars</h1>
          <form onSubmit={this.handleSubmit}>
            <p>
              as a memento of your travels, you are invited to end your journey
              by making a wish... for yourself, for your loved ones, or for the
              planet.
            </p>

            <div className="form-group">
              <label htmlFor="your name">your name</label>
              <div className="form-inputs">
                <input
                  value={this.state.name}
                  name="name"
                  type="text"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="your wish">your wish</label>
              <div className="form-inputs">
                <textarea
                  value={this.state.wish}
                  name="wish"
                  type="textarea"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <br />

            <button id="wishButton" type="submit">
              Make your Wish among the Stars
            </button>
          </form>
        </div>
      </Animated>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createAWish: newWish => dispatch(createWish(newWish))
  }
}

export default connect(null, mapDispatchToProps)(WishForm)
