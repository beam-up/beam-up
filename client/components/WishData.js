import React, {Component} from 'react'
import {Animated} from 'react-animated-css'

const WishData = props => {
  const {wish} = props

  const isNotEmpty = obj => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return true
    }
    return false
  }

  return isNotEmpty(wish) ? (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
      <div id="wish">
        <p>
          "{wish.message}" -{wish.name}
        </p>
      </div>
    </Animated>
  ) : null
}

export default WishData
