import React, {Component} from 'react'
import {Animated} from 'react-animated-css'
import {Link} from 'react-router-dom'

export default class EndOfExploration extends Component {
  render() {
    return (
      <div id="eoe-container">
        <div id="end-of-exp">
          <h2>MISSION COMPLETE</h2>
          <p>
            You've explored every exoplanet and completed your journey... now
            it's time to go back to Earth and confirm your findings.
          </p>
          <br />
          <Link to="/earth">
            <button type="button">Back To Earth</button>
          </Link>
        </div>
      </div>
    )
  }
}
