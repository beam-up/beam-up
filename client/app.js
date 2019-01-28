import React, {Component} from 'react'
import movingStarDustBackground from './threejs/floating-star-dust'
import {Navbar} from './components'
import Routes from './routes'

// class App extends Component {
// render() {
//   return (
//     <div>
//       <Navbar />
//       <Routes />
//     </div>
//     )
//   }
// }
class App extends Component {
  render() {
    return <div>{movingStarDustBackground()}</div>
  }
}

export default App
