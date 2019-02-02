import React from 'react'
import {Link} from 'react-router-dom'
import {Animated} from 'react-animated-css'
import * as THREE from '../../three'
import {starBackground} from './planets'

// ending screen with earth in it
// needs 3js

class Earth extends React.Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }

  componentDidMount() {
    // === 1. threeJS scene, camera, renderer set up ===
    const width = window.innerWidth
    const height = window.innerHeight
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000)
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(width, height)
    renderer.setClearColor('#000000')

    this.scene = scene
    this.camera = camera
    this.renderer = renderer

    // === 2. lighting ===
    scene.add(new THREE.AmbientLight(0x333333))
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 3, 5)
    scene.add(light)

    // === 3. creating the mesh(es) Earth mesh ===
    const geometry = new THREE.SphereGeometry(1, 100, 90)
    const texture = new THREE.TextureLoader().load(
      './images/nasaBlueMarble.jpg'
    )
    const material = new THREE.MeshPhongMaterial({map: texture})
    const earth = new THREE.Mesh(geometry, material)

    this.earth = earth
    this.starBackground = starBackground
    scene.add(earth, starBackground)

    // === background mesh ===

    // === 4. append scene to DOM ===
    this.mount.appendChild(this.renderer.domElement)

    // === 5. start scene ====
    this.start()
  }

  // === 6. stop scene ===
  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  // === 7. animate loop ===
  animate() {
    // this.earth.rotation.x += 0.001
    // this.earth.rotation.y += 0.001
    // this.earth.rotation.x = Date.now() * 0.0000002
    this.earth.rotation.y = Date.now() * 0.0001
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  // === 8. render scene ===
  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <div id="earthContainer">
          <h1>And this is our lovely planet...</h1>
          <div
            ref={mount => {
              this.mount = mount
            }}
          />
          <Link to="/wish">
            <button type="button">LET'S MAKE A WISH</button>
          </Link>
        </div>
      </Animated>
    )
  }
}

/*
const Earth = () => {
  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
      <div id="earthContainer">
        <h1>wow, what a lovely planet we have...</h1>
        <p>
          • Earth exists in the “Goldilocks zone” – an area which is neither too
          hot nor too cold for liquid water, an essential for Earth-like life,
          to be present
        </p>
        <p>
          • Our star (the Sun) is friendly - it doesn’t have strong stellar
          solar winds, like Proxima Centauri, or a flaring/inconsistent
          brightness, like YZ Ceti
        </p>
        <p>
          • Earth is not near a debris disk, like Tau Ceti - we don’t constantly
          risk collisions from asteroids and meteors
        </p>
        <h1>...and it's the only one we've got</h1>
        <Link to="/wish">
          <button type="button">LET'S MAKE A WISH</button>
        </Link>
      </div>
    </Animated>
  )
}
*/

export default Earth
