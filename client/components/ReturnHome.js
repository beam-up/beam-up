import React from 'react'
import {Link} from 'react-router-dom'
import {Animated} from 'react-animated-css'
import Particles from 'react-particles-js'

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

const ReturnHome = () => {
  return (
    <div className="homeContainer">
      <div id="particles">
        <Particles
          width='100vw'
          height='100vh'
          params={particleOpt}
        />
    </div>
      <Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
        <h1>BEAM UP</h1>
      </Animated>

      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <Link to="/home">
          <button type="button">RETURN HOME</button>
        </Link>
      </Animated>
    </div>
  )
}

export default ReturnHome
