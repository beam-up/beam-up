import React from 'react'
import {Link} from 'react-router-dom'
import {Animated} from 'react-animated-css'

const sampleplanet = 'Ross 128 b'
const visitedPlanets = 2
const remainingPlanets = 9

const MissionControl = () => {
  return (
    <div id="missionControl">
      <p>planets Visited: {visitedPlanets}</p>
      <p>planets Remaining: {remainingPlanets}</p>
      {/* this line below will have a display:none toggle, depending on whehter user is hovering or not */}
      <p>this planet is: {sampleplanet}</p>
    </div>
  )
}

export default MissionControl
