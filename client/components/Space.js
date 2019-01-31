import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Animated} from 'react-animated-css'
import * as THREE from '../../three'
import starBackground from './planets/starBackground'
import {
  earth,
  proxima,
  epsilon,
  ross128,
  yzCeti,
  yzCetiB,
  yzCetiC,
  yzCetiD,
  kapteynC
} from './planets'
import {stars, starsCount, newHeight, newWidth} from './Stars'
import { getAllPlanets } from '../store'
const OrbitControls = require('../../OrbitControls')(THREE)


// === !!! IMPORTANT !!! ===
// EVERY TIME YOU ADD A PLANET / ANYTHING TO THIS FILE, DON'T FORGET:
// - add everything to the scene
// - bind objects imported from /planets
// - sets positions of planets
// You can literally CMD+F the above 3 comments to jump directly to where you need to do these.

class Space extends React.Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
    this.createUniverse = this.createUniverse.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this)
  }

  componentDidMount() {
    // === making AJAX call fetching all planet data ===
    this.props.loadAllPlanets()
    // === window width & height  ===
    const width = window.innerWidth
    const height = window.innerHeight

    // === threeJS requirements ===
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000)
    const renderer = new THREE.WebGLRenderer({antialias: true})

    this.scene = scene
    this.camera = camera
    this.renderer = renderer

    // === orbit controls allows user to navigate 3D space with mouse ===
    const controls = new OrbitControls(camera, renderer.domElement)

    // === raycaster ===
    // raycasting is used for mouse picking (working out what objects in the 3d space the mouse is over)
    const raycaster = new THREE.Raycaster()
    let mouse = new THREE.Vector2(),
      INTERSECTED

    this.raycaster = raycaster
    this.mouse = mouse

    // === event listeners ===
    document.addEventListener('mousemove', this.onMouseMove, false)
    document.addEventListener('mousedown', this.onDocumentMouseDown, false)
    window.addEventListener('resize', this.onWindowResize, false)

    // === camera settings ===
    camera.position.z = 10

    // === renderer  settings ===
    // renderer displays your beautifully crafted scenes using WebGL
    renderer.setSize(width, height)
    renderer.setClearColor('#000000')
    // renderer.domElement.addEventListener('click', raycast, false)

    // === adds background & planets to the scene ===
    this.createUniverse()

    // === appends scene to the DOM ===
    this.mount.appendChild(this.renderer.domElement)

    // === start scene ===
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  onMouseMove() {
    this.mouse.x = event.clientX / window.innerWidth * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    let mouseX = event.clientX - window.innerWidth / 2
    let mouseY = event.clientY - window.innerHeight / 2
    this.camera.position.x += (mouseX - this.camera.position.x) * 0.01
    this.camera.position.y += (mouseY - this.camera.position.y) * 0.01
    this.camera.lookAt(this.scene.position)
  }

  onDocumentMouseDown() {
    event.preventDefault()
    this.mouse.x = event.clientX / window.innerWidth * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    this.raycaster.setFromCamera(this.mouse, this.camera)

    var intersects = this.raycaster.intersectObjects(this.planetGroup.children)
    if (intersects.length > 0) {
      // change this to single planets view
      window.open('/home')
    }
  }

  // === resizes scene if browser window size changes ===
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  createUniverse() {
    const planetGroup = new THREE.Object3D()

    // === !!! IMPORTANT !!! ===
    // === add everything to the scene ===

    // groups planets
    planetGroup.add(
      earth,
      proxima,
      epsilon,
      ross128,
      yzCeti,
      yzCetiB,
      yzCetiC,
      yzCetiD,
      kapteynC
    )

    // add background and planets to scene
    this.scene.add(starBackground, planetGroup)
    this.planetGroup = planetGroup

    // add stars to scene
    for (let i = 0; i < stars.length; i++) {
      this.scene.add(stars[i].geo)
    }

    // === !!! IMPORTANT !!! ===
    // === bind objects imported from /planets ===
    this.starBackground = starBackground
    this.earth = earth
    this.proxima = proxima
    this.epsilon = epsilon
    this.ross128 = ross128
    this.yzCeti = yzCeti
    this.yzCetiB = yzCetiB
    this.yzCetiC = yzCetiC
    this.yzCetiD = yzCetiD
    this.kapteynC = kapteynC
    this.stars = stars
    this.starsCount = starsCount
    this.newHeight = newHeight
    this.newWidth = newWidth
  }

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

  animate() {
    // === !!! IMPORTANT !!! ===
    // === sets positions of planets ===
    // default position is (x, y, z) => (0, 0, 0)
    this.proxima.position.set(-50, 0, -50)
    this.epsilon.position.set(80, 0, -100)
    this.ross128.position.set(100, 0, -80)
    this.yzCeti.position.set(-110, 0, 55)
    this.yzCetiC.position.set(-125, 0, 25)
    this.yzCetiB.position.set(-145, 0, 55)
    this.yzCetiD.position.set(-135, 0, 105)
    this.kapteynC.position.set(110, 0, 95)

    // === sets rotations of planets ===
    this.earth.rotation.y = Date.now() * 0.0001
    // this.earth.rotation.x = Date.now() * 0.0000002
    this.proxima.rotation.y = Date.now() * 0.0003
    // this.proxima.rotation.x = Date.now() * 0.00000002
    this.epsilon.rotation.y = Date.now() * 0.0001

    for (let i = 0; i < this.starsCount; i++) {
      this.stars[i].geo.position.x += this.stars[i].geo.direction.x / 3
      this.stars[i].geo.position.y += this.stars[i].geo.direction.y / 3
      // if edge is reached, bounce back
      if (
        this.stars[i].geo.position.x < -this.newWidth ||
        this.stars[i].geo.position.x > this.newWidth
      ) {
        this.stars[i].geo.direction.x = -this.stars[i].geo.direction.x
      }
      if (
        this.stars[i].geo.position.y < -this.newHeight ||
        this.stars[i].geo.position.y > this.newHeight
      ) {
        this.stars[i].geo.direction.y = -this.stars[i].geo.direction.y
      }
    }

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    // === ray caster !!! ===
    // update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera)

    // calculate objects intersecting the picking ray
    let intersects = this.raycaster.intersectObjects(this.planetGroup.children)

    if (intersects.length > 0) {
      const planetName = intersects[0].object.name
      const { allPlanets } = this.props
      console.log(allPlanets.some(planet => planet.name === planetName))
      if (allPlanets.some(planet => planet.name === planetName)) {
        console.log(allPlanets.filter(planet => planet.name === planetName))
      }
      console.log('ur hovering over', planetName)
    }

    // render scene
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <Link to="/home">
          <h1 id="titleLink">BEAM UP</h1>
        </Link>
        <div
          ref={mount => {
            this.mount = mount
          }}
        />
      </Animated>
    )
  }
}

const mapStateToProps = state => ({
  allPlanets:state.planet.allPlanets
})

const mapDispatchToProps = dispatch => ({
  loadAllPlanets: () => dispatch(getAllPlanets())
})

export default connect(mapStateToProps, mapDispatchToProps)(Space)
