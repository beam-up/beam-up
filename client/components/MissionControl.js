import React, {Component} from 'react'

const sampleplanet = 'Ross 128 b'

const MissionControl = props => {
  console.log('MISSION CONTROL PROPS', props)
  const {allPlanets, visitedPlanets} = props

  return (
    <div id="missionControl">
      <p>planets Visited: {visitedPlanets}</p>
      <p>planets Remaining: {allPlanets - visitedPlanets}</p>
      {/* this line below will have a display:none toggle, depending on whehter user is hovering or not */}
      <p>this planet is: {sampleplanet}</p>
    </div>
  )
}

export default MissionControl
