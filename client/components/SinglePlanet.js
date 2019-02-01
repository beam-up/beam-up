import React from 'react'
import {getSinglePlanet, areAllPlanetsVisited} from '../store'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

//should come from redux store... selectedPlanet
// const samplePlanetData = {
//   type: 'Super Earth',
//   name: 'Proxima Centauri b',
//   description:
//     '(also called Proxima b or Alpha Centauri Cb) is a Super Earth type exoplanet orbiting in the habitable zone of the red dwarf M-type star Proxima Centauri, which is the closest star to the Sun and part of a triple star system. Its mass is at least 1.27 Earths, it takes 11.2 days to complete one orbit of its star, and is 0.0485 AU from its star. Its discovery was announced in 2016. And it is located about 4.2 light-years (1.3 parsecs, 40 trillion km, or 25 trillion miles) from Earth in the constellation of Centaurus, making it the closest known exoplanet to the Solar System.',
//   mass: 'at least 1.27 Earths',
//   planetRadius: 'Unknown',
//   orbitalRadius: '0.0485 AU',
//   orbitalPeriod: '11.2 days',
//   discoveryYear: 2016
// }

class SinglePlanet extends React.Component {
  componentDidMount() {
    // const planetId = Number(this.props.match.params.planetId)
    this.props.getSinglePlanet(this.props.planetId)
  }

  render() {
    const {planetId} = this.props
    console.log('got em', planetId)
    console.log(this.props.state)
    // const planet = this.props.visitedPlanets.pop()
    // console.log(this.props.state)

    return (
      <div>
        <h1>hi</h1>
        {/* <h1>{planet.name}</h1>
        <p>{planet.description}</p>
        <p>Type: {planet.type}</p>
        <p>Mass: {planet.mass}</p>
        <p>Orbital Radius: {planet.orbitalPeriod}</p>
        <p>Orbital Period: {planet.orbitalPeriod}</p>
        <p>Year Discovered: {planet.discoveryYear}</p> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  state: state
  // allPlanets: state.planet.allPlanets
})

const mapDispatchToProps = dispatch => ({
  getSinglePlanet: planetId => getSinglePlanet(planetId),
  areAllPlanetsVisited: () => areAllPlanetsVisited()
})

const connectedSinglePlanet = connect(mapStateToProps, mapDispatchToProps)(
  SinglePlanet
)

export default withRouter(connectedSinglePlanet)
