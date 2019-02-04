import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Home, Space, SinglePlanet, ReturnHome, WishForm, Earth} from './components'
import {me} from './store'

class Routes extends Component {
  // componentDidMount() {
  //   this.props.loadInitialData()
  // }

  render() {
    // const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route path="/home" component={Home} />
        <Route exact path="/planets" component={Space} />
        <Route path="/returnhome" component={ReturnHome} />
        <Route path="/wish" component={WishForm} />
        <Route path='/earth' component={Earth}/>
        <Route path="/" component={Home} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
//     // Otherwise, state.user will be an empty object, and state.user.id will be falsey
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     loadInitialData() {
//       dispatch(me())
//     }
//   }
// }

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default Routes
// add withRouter if complication occurs

/**
 * PROP TYPES
 */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
