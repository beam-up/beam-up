import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Animated} from 'react-animated-css'
import * as THREE from '../../three'
import {Diamond} from './SingleDiamond'

class WishSubmitted extends Component {
  render() {
    return (
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <div id="wishSubmitted"> u submitted. nice </div>
        <Diamond />
      </Animated>
    )
  }
}

export default WishSubmitted
