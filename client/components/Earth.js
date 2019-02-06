import React from 'react'
import {Animated} from 'react-animated-css'
import * as THREE from '../../three'
import {starBackground} from './planets'
import {EarthText} from './EarthText'

const OrbitControls = require('../../OrbitControls')(THREE)

class Earth extends React.Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
  }

  componentDidMount() {
    // === 1. threeJS scene, camera, renderer set up ===
    const width = window.innerWidth
    const height = window.innerHeight
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000)
    camera.position.z = 5
    camera.position.y = 1



    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(width, height)
    renderer.setClearColor('#000000')

    // === orbit controls ===
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.maxDistance = 100
    controls.minDistance = 4
    this.controls = controls

    this.scene = scene
    this.camera = camera
    this.renderer = renderer

    // === event listener ===
    window.addEventListener('resize', this.onWindowResize, false)

    // === 2. light ===
    // const light = new THREE.PointLight(0xffffff, 1, 100)
    // light.position.set(5, 3, 5) // try (1, 1, 1)
    // scene.add(light)

    // === 3. creating the mesh(es) Earth mesh ===
    const geometry = new THREE.SphereGeometry(1, 100, 90)
    const texture = new THREE.TextureLoader().load('/images/earthClouds.jpg')
    // const material = new THREE.MeshPhongMaterial({map: texture}) // if using light
    const material = new THREE.MeshBasicMaterial({map: texture})
    const earth = new THREE.Mesh(geometry, material)

    // === background mesh ===
    // const backgroundGeometry = new THREE.SphereGeometry(400, 64, 64)
    // const backgroundMaterial = new THREE.MeshBasicMaterial()
    // backgroundMaterial.map = new THREE.TextureLoader().load(
    //   '/images/blackStarfield.png'
    // )
    // backgroundMaterial.side = THREE.BackSide
    // const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial)

    this.earth = earth
    this.starBackground = starBackground
    scene.add(earth, starBackground)

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

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
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
    this.earth.position.y = .5
    this.controls.update()
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
          <EarthText />
          <div
            ref={mount => {
              this.mount = mount
            }}
          />
      </Animated>
    )
  }
}

export default Earth
