import React from 'react'
import {Link} from 'react-router-dom'
import {Animated} from 'react-animated-css'
import {connect} from 'react-redux'
import {clearState} from '../store'

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

const mapDispatchToProps = dispatch => ({
    clearState: () => dispatch(clearState())
})

export default connect(null, mapDispatchToProps)(ReturnHome)