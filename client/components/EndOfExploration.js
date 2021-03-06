import React, {Component} from 'react'
import {Animated} from 'react-animated-css'
import {Link} from 'react-router-dom'

export default class EndOfExploration extends Component {
  render() {
    return (
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <div id="eoe-container">
          <div id="end-of-exp">
            <h2>MISSION COMPLETE</h2>
            <div id="eoe-message">
              <p>
                You've explored every exoplanet and completed your journey...{' '}
              </p>
              <p>
                now it's time to go back to Earth and confirm your findings.
              </p>
            </div>
            <br />
            <Link to="/earth">
              <button type="button">Back To Earth</button>
            </Link>
          </div>
        </div>
      </Animated>
    )
  }
}
