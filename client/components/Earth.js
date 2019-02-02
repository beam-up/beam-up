// import React from 'react'
// import {Link} from 'react-router-dom'
// import {Animated} from 'react-animated-css'
// import * as THREE from '../../three'

// // ending screen with earth in it
// // needs 3js

// class Earth extends React.Component {
//   // constructor(props) {
//   //   super(props)
//   // }

//   componentDidMount() {
//     // === threeJS scene, camera, renderer set up ===
//     const width = window.innerWidth
//     const height = window.innerHeight
//     const scene = new THREE.Scene()
//     const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000)
//     camera.position.z = 1.5
//     const renderer = new THREE.WebGLRenderer({antialias: true})
//     renderer.setSize(width, height)

//     // === lighting ===
//     scene.add(new THREE.AmbientLight(0x333333))
//     const light = new THREE.DirectionalLight(0xffffff, 1)
//     light.position.set(5, 3, 5)
//     scene.add(light)

//     // === Earth mesh ===
//     const geometry = new THREE.SphereGeometry(1, 100, 90)
//     const material = new THREE.MeshPhongMaterial()
//     const earthMesh = new THREE.Mesh(geometry, material)
//     scene.add(earthMesh)
//     material.map = THREE.ImageUtils.loadTexture('images/earthmap1k.jpg')
//   }

//   render() {
//     return (
//       <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
//         <div id="earthContainer">
//           <h1>And this is our lovely planet...</h1>
//           <Link to="/wish">
//             <button type="button">LET'S MAKE A WISH</button>
//           </Link>
//         </div>
//       </Animated>
//     )
//   }
// }

// /*
// const Earth = () => {
//   return (
//     <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
//       <div id="earthContainer">
//         <h1>wow, what a lovely planet we have...</h1>
//         <p>
//           • Earth exists in the “Goldilocks zone” – an area which is neither too
//           hot nor too cold for liquid water, an essential for Earth-like life,
//           to be present
//         </p>
//         <p>
//           • Our star (the Sun) is friendly - it doesn’t have strong stellar
//           solar winds, like Proxima Centauri, or a flaring/inconsistent
//           brightness, like YZ Ceti
//         </p>
//         <p>
//           • Earth is not near a debris disk, like Tau Ceti - we don’t constantly
//           risk collisions from asteroids and meteors
//         </p>
//         <h1>...and it's the only one we've got</h1>
//         <Link to="/wish">
//           <button type="button">LET'S MAKE A WISH</button>
//         </Link>
//       </div>
//     </Animated>
//   )
// }
// */

// export default Earth
