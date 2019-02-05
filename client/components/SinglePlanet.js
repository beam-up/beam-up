import React from 'react'

class SinglePlanet extends React.Component {
  render() {
    const {planet} = this.props
    return planet ? (
      <div id="singlePlanet">
        <h1>{planet.name}</h1>
        <p>{planet.description}</p>
        <p>Habitability: {planet.habitability}</p>
        <p>Type: {planet.type}</p>
        <p>Mass: {planet.mass}</p>
        <p>Orbital Radius: {planet.orbitalRadius}</p>
        <p>Orbital Period: {planet.orbitalPeriod}</p>
        <p>Year Discovered: {planet.discoveryYear}</p>
      </div>
    ) : null
  }
}

export default SinglePlanet
