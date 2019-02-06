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

const Home = () => {
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

        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <div className="homeText" style={{textTransform: 'lowercase'}}>
            <p>An ethereal 3D journey beyond our solar system.</p>
            <br />
            <p>
              Travel through the cosmos and discover exoplanets for human
              habitation. The catch? There's no other planet out there that
              compares to the one we have.
            </p>
            <br />
            <p>
              Zoom to planets beyond our solar system to reveal their data and
              habitability status (sourced from nasa). Complete your journey to
              discover how the planet you know and love, Earth, has all you'll
              ever need – as long as you treat her right.
            </p>
          </div>
        </Animated>

        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <Link to="/planets">
            <button type="button">START EXPLORING</button>
          </Link>
        </Animated>
      </div>
    </Animated>
  )
}

export default Home
