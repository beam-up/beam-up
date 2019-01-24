import React, {Component} from 'react'

// import {Navbar} from './components'
// import Routes from './routes'

import threeEntryPoint from './components/threeEntryPoint'

export default class App extends Component {
  componentDidMount() {
    threeEntryPoint(this.threeRootElement)
  }

  render() {
    return (
      <div
        className="header-header"
        ref={element => (this.threeRootElement = element)}
      />
    )
  }
}

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <Routes />
//     </div>
//   )
// }

// export default App
