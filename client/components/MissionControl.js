import React, {Component} from 'react'
import {Animated} from 'react-animated-css'

const MissionControl = props => {
  // console.log('MISSION CONTROL PROPS', props)
  const {planetName, allPlanets, visitedPlanets} = props

  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
      <div id="missionControl">
        <br />
        <h4>MISSION</h4>
        <br />
        <p>• planets Visited: {visitedPlanets}</p>
        <p>• planets Remaining: {allPlanets - visitedPlanets}</p>
        {/* this line below will have a display:none toggle, depending on whehter user is hovering or not */}
        <p>• this planet is:</p>
        <p>{planetName}</p>
        <br />

        {/* CONTROLS */}
        <h4>CONTROLS</h4>
        <br />
        <p>
          <i className="fas fa-mouse-pointer" /> click on a planet
        </p>
        <p>to fly to it</p>

        <br />

        <p>
          <i className="fas fa-hand-lizard" /> pinch to zoom
        </p>

        <br />
        <p>
          <i className="fas fa-arrows-alt" /> click &amp; drag the sky to change
          your perspective
        </p>
      </div>
    </Animated>
  )
}

export default MissionControl
