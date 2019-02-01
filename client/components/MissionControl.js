import React, {Component} from 'react'

const MissionControl = props => {
  // console.log('MISSION CONTROL PROPS', props)
  const {planetName, allPlanets, visitedPlanets} = props

  return (
    <div id="missionControl">
      <p>planets Visited: {visitedPlanets}</p>
      <p>planets Remaining: {allPlanets - visitedPlanets}</p>
      {/* this line below will have a display:none toggle, depending on whehter user is hovering or not */}
      <p>this planet is: {planetName}</p>
    </div>
  )
}

export default MissionControl
