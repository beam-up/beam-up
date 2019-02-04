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
        <div id="homeText">
          <p>an ethereal 3D journey through space and time</p>
          <p>
            travel through the cosmos and discover exoplanets for human
            habitation
          </p>
          <p>use your mouse to orbit around our dreamy universe</p>
          <br />
          <p>someone else can totally edit this text if ya like</p>
          <p>also floating background particles would b rly nice here!!</p>
        </div>
      </Animated>

      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <Link to="/planets">
          <button type="button">START EXPLORING</button>
        </Link>
      </Animated>
    </div>
  )
}

export default Home
