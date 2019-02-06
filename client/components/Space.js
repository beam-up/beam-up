import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Animated} from 'react-animated-css'
import * as THREE from '../../three'
import TWEEN from '@tweenjs/tween.js'
const OrbitControls = require('../../OrbitControls')(THREE)

// === 3D MODELS ===
import {
  starBackground,
  asteroids,
  earth,
  proxima,
  epsilon,
  ross128,
  yzCetiB,
  yzCetiC,
  yzCetiD,
  kapteynC,
  tauCetiH,
  tauCetiG,
  tauCetiE,
  tauCetiF
} from './planets'
import {getAllPlanets, getSinglePlanet, getWishes} from '../store'
import {stars, starCubeH, starCubeW} from './Stars'
import {diamonds} from './Diamonds'
// === REACT COMPONENTS ===
import SinglePlanet from './SinglePlanet'
import MissionControl from './MissionControl'
import WishData from './WishData'
import EndOfExploration from './EndOfExploration'

// === !!! IMPORTANT !!! ===
// EVERY TIME YOU ADD A PLANET / ANYTHING TO THIS FILE, DON'T FORGET:
// - add everything to the scene
// - bind objects imported from /planets
// - sets positions of planets
// You can literally CMD+F the word "IMPORTANT" to jump directly to where you need to do these.

class Space extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      planet: {},
      wish: {},
      planetHoverName: '???',
      cursorValue: 'auto',
      singlePlanetDisplayValue: false,
      wishDisplayValue: false,
      clicked: false,
      sphereData: {},
      planetsGlowing: new Set(),
    }

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
    this.getRandomWish = this.getRandomWish.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
    this.createUniverse = this.createUniverse.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.tweenInProgress = false
    this.controls = false
    this.once = this.once.bind(this)
    this.addGlow = this.addGlow.bind(this)
  }

  componentDidMount() {
    // === making AJAX call fetching all planet + wish data ===
    this.props.loadAllPlanets()
    this.props.getWishes()

    // === window width & height  ===
    const width = window.innerWidth
    const height = window.innerHeight

    // === threeJS requirements ===
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100000)
    const renderer = new THREE.WebGLRenderer({antialias: true})

    this.scene = scene
    this.camera = camera
    this.renderer = renderer

    // === orbit controls allows user to navigate 3D space with mouse ===
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.maxDistance = 100
    controls.minDistance = 10
    this.controls = controls

    // === raycaster ===
    // raycasting is used for mouse picking (working out what objects in the 3d space the mouse is over)
    const raycaster = new THREE.Raycaster()
    let mouse = new THREE.Vector2(),
      INTERSECTED

    this.raycaster = raycaster
    this.mouse = mouse

    // === event listeners ===
    document.addEventListener('mousemove', this.onMouseMove, false)
    document.addEventListener('mousedown', this.onMouseDown, false)
    window.addEventListener('resize', this.onWindowResize, false)

    // === renderer  settings ===
    // renderer displays your beautifully crafted scenes using WebGL
    renderer.setSize(width, height)
    renderer.setClearColor('#000000')

    // === adds background & planets to the scene ===
    this.createUniverse()

    // === appends scene to the DOM ===
    this.mount.appendChild(this.renderer.domElement)

    // === start scene ===
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    // i'm getting a weird error: "Can't perform a React state update on an unmounted component." and i think it has to do with the below
    this.mount.removeChild(this.renderer.domElement)
  }

  onMouseMove() {
    this.mouse.x = event.clientX / window.innerWidth * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    // calculate planets AND wish diamonds intersecting the picking ray
    let planets = this.raycaster.intersectObjects(this.planetGroup.children)

    if (planets.length > 0) {
      //cursor turns into pointer if hovering over planet
      this.setState({
        cursorValue: 'pointer'
      })
    } else {
      //cursor turns back to normal if NOT hovering over planet
      this.setState({
        cursorValue: 'auto'
      })
    }
  }

  async onMouseDown() {
    event.preventDefault()
    this.mouse.x = event.clientX / window.innerWidth * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    // === WISHES!!! ===
    let wishes = this.raycaster.intersectObjects(this.wishGroup.children)
    if (wishes.length > 0) {
      this.setState({
        wish: this.getRandomWish(this.props.wishes),
        wishDisplayValue: true
      })
    } else {
      this.setState({
        wishDisplayValue: false
      })
    }

    // === PLANETS!!! ===
    let planets = this.raycaster.intersectObjects(this.planetGroup.children)
    const planetName = planets.length && planets[0].object.name
    this.props.visitedPlanets.forEach(planet => {
      if(
        this.state.planetsGlowing.has(planet.name) ||
        planet.name === planetName
      ) return
      this.addGlow(this.state.sphereData)
      this.state.planetsGlowing.add(planet.name)
    })

    if (planets.length > 0 && planets[0].object.name !== '???') {
      //cursor turns into pointer if hovering over planet/wish
      this.setState({
        clicked: true,
        singlePlanetDisplayValue: true,
        sphereData: planets[0].object
      })
      const {allPlanets} = this.props
      const currPlanet = allPlanets.find(
        currentPlanet => currentPlanet.name === planetName
      )
      if (allPlanets.some(planet => planet.name === planetName)) {
        this.setState({
          planet: currPlanet
        })
        // This marks the planet as visited.
        await this.props.loadSinglePlanet(this.state.planet.id)
      }
    } else {
      this.setState({singlePlanetDisplayValue: false})
    }
  }

  // === resizes scene if browser window size changes ===
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  once(fn) {
    let returnValue
    let canRun = true
    return (...args) => {
      if (canRun) {
        returnValue = fn(...args)
        canRun = false
      }
      return returnValue
    }
  }

  addGlow(planet) {
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: '#ffffff',
      opacity: 0.5,
      transparent: true
    })
    const radius = planet.geometry.parameters.radius
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 100, 90),
      glowMaterial
    )
    glow.position.set(planet.position.x, planet.position.y, planet.position.z)
    glow.scale.multiplyScalar(1.15)
    this.scene.add(glow)
  }

  getRandomWish(wishes) {
    return wishes[Math.floor(Math.random() * wishes.length)]
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
      yzCetiB,
      yzCetiC,
      yzCetiD,
      kapteynC,
      tauCetiE,
      tauCetiG,
      tauCetiH,
      tauCetiF
    )

    // add background and planets to scene
    this.scene.add(starBackground, planetGroup, asteroids)
    this.planetGroup = planetGroup

    // add stars to scene
    for (let i = 0; i < stars.length; i++) {
      this.scene.add(stars[i])
    }

    const wishGroup = new THREE.Group()
    // add wish diamonds to scene
    for (let i = 0; i < diamonds.length; i++) {
      wishGroup.add(diamonds[i])
    }
    this.scene.add(wishGroup)
    this.wishGroup = wishGroup

    // === !!! IMPORTANT !!! ===
    // === bind objects imported from /planets ===
    this.starBackground = starBackground
    this.asteroids = asteroids
    this.earth = earth
    this.proxima = proxima
    this.epsilon = epsilon
    this.ross128 = ross128
    this.yzCetiB = yzCetiB
    this.yzCetiC = yzCetiC
    this.yzCetiD = yzCetiD
    this.kapteynC = kapteynC
    this.tauCetiG = tauCetiG
    this.tauCetiE = tauCetiE
    this.tauCetiH = tauCetiH
    this.tauCetiF = tauCetiF

    this.stars = stars
    this.diamonds = diamonds
    this.starCubeH = starCubeH
    this.starCubeW = starCubeW
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
    this.proxima.position.set(-50, -10, -50)
    this.epsilon.position.set(80, 5, -100)
    this.ross128.position.set(100, 3, -80)
    this.yzCetiC.position.set(-125, -5, 25)
    this.yzCetiB.position.set(-145, 7, 55)
    this.yzCetiD.position.set(-135, -8, 105)
    this.kapteynC.position.set(110, 0, 95)
    this.tauCetiH.position.set(-100, 6, -120)
    this.tauCetiG.position.set(-75, 5, -70)
    this.tauCetiE.position.set(-70, 11, -100)
    this.tauCetiF.position.set(-90, 12, -150)
    this.asteroids.position.set(-75, 0, -105)

    // === sets rotations of planets ===
    this.earth.rotation.y = Date.now() * 0.0001
    this.proxima.rotation.y = Date.now() * 0.0003
    // this.proxima.rotation.x = Date.now() * 0.00000002
    this.epsilon.rotation.y = Date.now() * 0.0001
    this.ross128.rotation.y = Date.now() * 0.0001
    this.yzCetiC.rotation.y = Date.now() * 0.0001
    this.yzCetiB.rotation.y = Date.now() * 0.0001
    this.yzCetiD.rotation.y = Date.now() * 0.0001
    this.kapteynC.rotation.y = Date.now() * 0.0001
    this.tauCetiH.rotation.y = Date.now() * 0.0001
    this.tauCetiG.rotation.y = Date.now() * 0.0001
    this.tauCetiE.rotation.y = Date.now() * 0.0001
    this.tauCetiF.rotation.y = Date.now() * 0.0001
    this.asteroids.rotation.y = Date.now() * 0.00001

    // === sets random movement of stars ===
    let timer = 0.00001 * Date.now()
    for (let i = 0; i < this.stars.length; i++) {
      const star = stars[i]
      star.position.x = starCubeW * Math.cos(timer + i)
      star.position.z = starCubeH * Math.sin(timer + i * 1.1)
    }

    // === set random movement of diamonds ===
    for (let i = 0; i < this.diamonds.length; i++) {
      const diamond = diamonds[i]
      diamond.position.x = (starCubeW - 100) * Math.cos(timer + i)
      diamond.position.z = (starCubeH - 100) * Math.sin(timer + i * 1.1)
      // set rotation of diamonds
      diamond.rotation.y += Math.random() / 50
      diamond.rotation.x -= Math.random() / 50
      diamond.rotation.z -= Math.random() / 50
    }

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
    TWEEN.update()
  }

  renderScene() {
    // === ray caster !!! ===
    // update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera)
    // calculate objects intersecting the picking ray
    let intersects = this.raycaster.intersectObjects(this.planetGroup.children)

    if (intersects.length > 0) {
      var planet = intersects[0].object
      const target = intersects[0].object.position
      window.THREE = THREE
      let viewTarget = target.clone()
      window.target = viewTarget
      window.camera = this.camera

      if (intersects[0].object.geometry.parameters.radius > 3) {
        viewTarget.z = viewTarget.z - 20
      } else {
        viewTarget.z = viewTarget.z - 5
      }

      const position = this.camera.position
      const tween = new TWEEN.Tween(position).to(viewTarget, 2000)

      // during tween
      tween.onUpdate(() => {
        this.setState({singlePlanetDisplayValue: false})
        this.camera.lookAt(target)
      })

      tween.onComplete(() => {
        this.tweenInProgress = false
        this.camera.lookAt(target)
        this.setState({clicked: false, singlePlanetDisplayValue: true})
        this.controls.target = target
        tween.stop()
        // console.log('here is the planet data we can work with', planet.geometry)
      })

      // starts tween
      if (!this.tweenInProgress) {
        if (this.state.clicked === true) {
          this.camera.lookAt(target)
          tween.start()
          this.tweenInProgress = true
        }
      }

      const planetName = intersects[0].object.name
      this.setState({planetHoverName: planetName})
    }
    // render scene
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    const {cursorValue, singlePlanetDisplayValue, wishDisplayValue} = this.state
    const {allPlanetsHaveBeenVisited} = this.props
    return (
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <Link to="/home">
          <h1 id="titleLink">BEAM UP</h1>
        </Link>
        {allPlanetsHaveBeenVisited && <EndOfExploration />}
        <MissionControl
          planetName={this.state.planetHoverName}
          visitedPlanets={this.props.visitedPlanets.length}
          allPlanets={this.props.allPlanets.length}
        />
        {wishDisplayValue && <WishData wish={this.state.wish} />}
        {singlePlanetDisplayValue && (
          <SinglePlanet
            planet={this.state.planet}

          />
        )}
        <div
          style={{cursor: cursorValue}}
          ref={mount => {
            this.mount = mount
          }}
        />
      </Animated>
    )
  }
}

const mapStateToProps = state => ({
  allPlanets: state.planet.allPlanets,
  visitedPlanets: state.planet.visitedPlanets,
  allPlanetsHaveBeenVisited: state.planet.allPlanetsHaveBeenVisited,
  wishes: state.wish
})

const mapDispatchToProps = dispatch => ({
  loadAllPlanets: () => dispatch(getAllPlanets()),
  loadSinglePlanet: planetId => dispatch(getSinglePlanet(planetId)),
  getWishes: () => dispatch(getWishes())
})

export default connect(mapStateToProps, mapDispatchToProps)(Space)
