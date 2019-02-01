import React from 'react'
import {Link} from 'react-router-dom'
import {Animated} from 'react-animated-css'

// ending screen with earth in it
// needs 3js
const Earth = () => {
  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
      <div className="earthContainer">
        <h1>wow, what a lovely planet we have...</h1>
        <p>
          • Earth exists in the “Goldilocks zone” – an area which is neither too
          hot nor too cold for liquid water, an essential for Earth-like life,
          to be present
        </p>
        <p>
          • Our star (the Sun) is friendly - it doesn’t have strong stellar
          solar winds, like Proxima Centauri, or a flaring/inconsistent
          brightness, like YZ Ceti
        </p>
        <p>
          • Earth is not near a debris disk, like Tau Ceti - we don’t constantly
          risk collisions from asteroids and meteors
        </p>
        <h1>...and it's the only one we've got</h1>
        <Link to="/wish">
          <button type="button">LET'S MAKE A WISH</button>
        </Link>
      </div>
    </Animated>
  )
}

export default Earth
