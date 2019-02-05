import React from 'react'
import {connect} from 'react-redux'
import {planetSelectedThunk} from '../store'

class SinglePlanet extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.togglePlanetSelected()
  }

  render() {
    const {planet} = this.props

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
        <button type="button" onClick={this.handleClick}>
          continue exploring
        </button>
      </div>
    ) : null
  }
}

const mapStateToProps = state => ({
  planetSelected: state.planet.planetSelected
})

const mapDispatchToProps = dispatch => ({
  togglePlanetSelected: () => dispatch(planetSelectedThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlanet)
