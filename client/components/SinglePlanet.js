import React from 'react'
import {toggleLinking} from '../store'
import {connect} from 'react-redux'

class SinglePlanet extends React.Component {
  // console.log('array or object: if true, array; not true, object', Array.isArray(planet))
  // console.log('SinglePlanet PROPS', planet)

  handleClick() {
    this.props.toggleLinking()
    console.log('clicked')
  }
  render () {
    const {planet, showButton} = this.props
    return (planet ? (
      <div id="singlePlanet">
        <h1>{planet.name}</h1>
        <p>{planet.description}</p>
        <p>Habitability: {planet.habitability}</p>
        <p>Type: {planet.type}</p>
        <p>Mass: {planet.mass}</p>
        <p>Orbital Radius: {planet.orbitalRadius}</p>
        <p>Orbital Period: {planet.orbitalPeriod}</p>
        <p>Year Discovered: {planet.discoveryYear}</p>
        {showButton && (<button onClick={this.handleClick}>Congrats! You have reached the last planet</button>)}
      </div>
    ) : null)
  }
}

const mapDispatchToProps = dispatch => ({
  toggleLinking: dispatch(toggleLinking())
})
export default connect(null, mapDispatchToProps)(SinglePlanet)
