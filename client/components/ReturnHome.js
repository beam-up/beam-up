import React from 'react'
import {Link} from 'react-router-dom'
import {Animated} from 'react-animated-css'

const ReturnHome = () => {
  return (
    <div className="homeContainer">
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