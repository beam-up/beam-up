import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Animated} from 'react-animated-css'
import Particles from 'react-particles-js'
import {connect} from 'react-redux'
import {clearState} from '../store'

const particleOpt = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true
      }
    }
  }
}

class ReturnHome extends Component {
  // constructor() {

  // }
  handleClick() {
    this.props.clearState()
  }

  render() {
    return (
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <div className="homeContainer">
          <div id="particles">
            <Particles width="100vw" height="100vh" params={particleOpt} />
          </div>
          <Animated
            animationIn="slideInUp"
            animationOut="fadeOut"
            isVisible={true}
          >
            <h1>BEAM UP</h1>
          </Animated>

          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={true}
          >
            <div className="homeText">
              <p>is an immersive, 3d space-traveling experience</p>
              <p>built by Beiatrix pedrasa, Emily zerbe,</p>
              <p>Ang li, and Molly carlot-clarke.</p>
              <br />
              <p>thank you for visiting our app.</p>
            </div>
          </Animated>

          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={true}
          >
            <Link to="/home">
              <button type="button" onClick={this.handleClick}>
                RETURN HOME
              </button>
            </Link>
          </Animated>
        </div>
      </Animated>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  clearState: dispatch(clearState())
})

export default connect(null, mapDispatchToProps)(ReturnHome)
