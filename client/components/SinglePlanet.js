import React from 'react'
// import {showLinkingComponent} from '../store'
// import {connect} from 'react-redux'

class SinglePlanet extends React.Component {
  // console.log('array or object: if true, array; not true, object', Array.isArray(planet))
  // console.log('SinglePlanet PROPS', planet)

  // constructor(props) {
  //   super(props)
  //   this.handleClick = this.handleClick.bind(this)
  // }

  // handleClick() {
  // this.props.showLinkingComponent()
  // console.log('clicked')
  // }
  render() {
    const {planet, showButton} = this.props
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
        {/* don't forget to add back onclick handleclick to button */}
        {showButton && (
          <button
            onClick={e => {
              console.log('u clicked!!!!!!!')
            }}
          >
            Congrats! You have reached the last planet
          </button>
        )}
      </div>
    ) : null
  }
}

// const mapDispatchToProps = dispatch => ({
//   showLinkingComponent: dispatch(showLinkingComponent())
// })
// export default connect(null, mapDispatchToProps)(SinglePlanet)

export default SinglePlanet
