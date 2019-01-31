import React from 'react'

//should come from redux store... selectedPlanet
const samplePlanetData = {
  type: 'Super Earth',
  name: 'Proxima Centauri b',
  description:
    '(also called Proxima b or Alpha Centauri Cb) is a Super Earth type exoplanet orbiting in the habitable zone of the red dwarf M-type star Proxima Centauri, which is the closest star to the Sun and part of a triple star system. Its mass is at least 1.27 Earths, it takes 11.2 days to complete one orbit of its star, and is 0.0485 AU from its star. Its discovery was announced in 2016. And it is located about 4.2 light-years (1.3 parsecs, 40 trillion km, or 25 trillion miles) from Earth in the constellation of Centaurus, making it the closest known exoplanet to the Solar System.',
  mass: 'at least 1.27 Earths',
  planetRadius: 'Unknown',
  orbitalRadius: '0.0485 AU',
  orbitalPeriod: '11.2 days',
  discoveryYear: 2016
}

export default class SinglePlanet extends React.Component {
  render() {
    //should become this.props.selectedPlanet, from redux
    const planet = samplePlanetData

    return (
      <div>
        <h1>{planet.name}</h1>
        <p>{planet.description}</p>
        <p>Type: {planet.type}</p>
        <p>Mass: {planet.mass}</p>
        <p>Orbital Radius: {planet.orbitalPeriod}</p>
        <p>Orbital Period: {planet.orbitalPeriod}</p>
        <p>Year Discovered: {planet.discoveryYear}</p>
      </div>
    )
  }
}
