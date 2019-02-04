import React, {Component} from 'react'

const WishData = props => {
  const {wish} = props

  // console.log('WISH', wish)

  return wish ? (
    <div id="wish">
      <p>
        "{wish.message}" -{wish.name}
      </p>
    </div>
  ) : null
}

export default WishData
