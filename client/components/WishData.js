import React, {Component} from 'react'

const WishData = props => {
  const {wish} = props

  const isNotEmpty = (obj) => {
    for (let key in obj) {
      if(obj.hasOwnProperty(key))
        return true
    }
    return false
  }

  return isNotEmpty(wish) ? (
    <div id="wish">
      <p>
        "{wish.message}" -{wish.name}
      </p>
    </div>
  ) : null
}

export default WishData
