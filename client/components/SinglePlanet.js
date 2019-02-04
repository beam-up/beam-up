import React from 'react'

const SinglePlanet = props => {
  const {planet} = props
  // console.log('array or object: if true, array; not true, object', Array.isArray(planet))
  // console.log('SinglePlanet PROPS', planet)

  return planet ? (
    <div id="singlePlanet">
      <h1>{planet.name}</h1>
      <h2>Habitability: {planet.habitability}</h2>
      <p>{planet.description}</p>
      <p>Type: {planet.type}</p>
      <p>Mass: {planet.mass}</p>
      <p>Orbital Radius: {planet.orbitalPeriod}</p>
      <p>Orbital Period: {planet.orbitalPeriod}</p>
      <p>Year Discovered: {planet.discoveryYear}</p>
    </div>
  ) : null
}

export default SinglePlanet
