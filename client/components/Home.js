import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div id="homeContainer">
      <h1>BEAM UP</h1>
      <p>an ethereal 3D journey through space and time</p>
      <p>travel through the cosmos and discover exoplanets</p>
      <p>use your mouse to orbit around our dreamy universe</p>
      <Link to="/space">
        <button type="button">START EXPLORING</button>
      </Link>
    </div>
  )
}

export default Home
