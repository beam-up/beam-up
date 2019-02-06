import React from 'react'
import {Link} from 'react-router-dom'
import {Animated} from 'react-animated-css'

export const WishSubmittedText = () => {
  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
      <div id="wishSubmitted">
        <div id="wishSubmittedText">
          <h1>thank you</h1>
          <br />
          <p>
            your wish has been stored. the next time you visit, if you happen to
            find one of these space diamonds, you just might be able to view
            your wish. or, discover the voices of other travelers who have
            shared their sentiments.
          </p>
          <Link to="/returnhome">
            <button id="wishButton" type="submit">
              onward
            </button>
          </Link>
        </div>
      </div>
    </Animated>
  )
}
