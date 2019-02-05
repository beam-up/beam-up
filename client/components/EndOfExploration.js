import React, {Component} from 'react'
import {Animated} from 'react-animated-css'
import {Link} from 'react-router-dom'

export default class EndOfExploration extends Component {


  render() {
    return (
      <div id='eoe-container'>
        <div id='end-of-exp'>
          <h4>You've completed your mission of exploring all planets...now it's time to go back to earth and report your findings</h4>
          <Link to='/earth'>
            <button>Back To Earth</button>
          </Link>
        </div>
      </div>
    )
  }
}

