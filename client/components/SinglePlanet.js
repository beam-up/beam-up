import React from 'react'
import {Animated} from 'react-animated-css'

class SinglePlanet extends React.Component {
  render() {
    const {planet} = this.props
    return planet ? (
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <div id="singlePlanet">
          <h1>{planet.name}</h1>
          <br />
          <hr />
          <br />
          <div id="singlePlanetContent">
            <div id="singlePlanetDescription">
              <p>{planet.description}</p>
            </div>
            <div id="singlePlanetData">
              <p>
                <strong>Habitability:</strong> {planet.habitability}
              </p>
              <br />
              <p>
                <strong>Type:</strong> {planet.type}
              </p>
              <br />
              <p>
                <strong>Mass:</strong> {planet.mass}
              </p>
              <br />
              <p>
                <strong>Orbital Radius:</strong> {planet.orbitalRadius}
              </p>
              <br />
              <p>
                <strong>Orbital Period:</strong> {planet.orbitalPeriod}
              </p>
              <br />
              <p>
                <strong>Year Discovered:</strong> {planet.discoveryYear}
              </p>
            </div>
          </div>
        </div>
      </Animated>
    ) : null
  }
}

export default SinglePlanet
