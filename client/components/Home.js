import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div id="homeContainer">
      <h1>BEAM UP</h1>
      <div id="homeText">
        <p>an ethereal 3D journey through space and time</p>
        <p>
          travel through the cosmos and discover exoplanets for human habitation
        </p>
        <p>use your mouse to orbit around our dreamy universe</p>
        <br />
        <p>maybe write some more nice words here my lovely teammates</p>
        <p>
          u r all smart, strong, talented, n beautiful. #beamteam4lyfe. jus
          tryna fill in some space cos i don't feel like writing a real intro /
          description. i think some floating particles around the home page
          would be nice even if static
        </p>
        <p>hey remember when our app was about collecting garbage</p>
      </div>
      <Link to="/space">
        <button type="button">START EXPLORING</button>
      </Link>
    </div>
  )
}

export default Home
