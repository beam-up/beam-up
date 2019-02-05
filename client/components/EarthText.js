import React from 'react'
import {Link} from 'react-router-dom'
import {Animated} from 'react-animated-css'

export const EarthText = () => {
  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
      <div id="earthText">
        <h2>what a lovely planet we have...</h2>
        <br />
        <p>
          In your travels, you did not encounter another planet that is suitable
          for human life, but don't be discouraged. We have this beautiful
          planet where the existence of life is serendipitous on a cosmic scale.
        </p>
        <br />
        <p>
          Our world orbits the sun at just the right distance – the “Goldilocks
          zone” – which is neither too hot nor too cold for liquid water, an
          essential for Earth-like life, to be present.
        </p>
        <br />
        <p>
          The Sun, our star, is pretty friendly - it doesn’t have strong stellar
          solar winds, like Proxima Centauri, or a flaring, inconsistent
          brightness, like YZ Ceti.
        </p>
        <br />
        <p>
          Earth is not near a debris disk, like Tau Ceti - so we don’t
          constantly risk collisions from asteroids and meteors.
        </p>
        <br />
        <p>
          What a lovely planet we have, and it's the only one we've got. Let's
          take good care of it.
        </p>
        <br />
        <p>
          You are invited to leave your mark on the universe by making a wish,
          as a memento of your travels.
        </p>
        <Link to="/wish">
          <button id="earthButton" type="button">
            LET'S MAKE A WISH
          </button>
        </Link>
      </div>
    </Animated>
  )
}
