import React from 'react'
import * as THREE from '../../three'
import starBackground from './planets/starBackground'
import {earth, proxima, epsilon, ross128} from './planets'

const OrbitControls = require('../../OrbitControls')(THREE)

export default class Space extends React.Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }

  componentDidMount() {
    const width = window.innerWidth
    const height = window.innerHeight

    // === threeJS requirements ===
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000)
    const renderer = new THREE.WebGLRenderer({antialias: true})

    // === resizes browser window ===
    window.addEventListener(
      'resize',
      function() {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
      },
      false
    )

    // === camera settings ===
    // camera.position.set(0, 0, 10)
    camera.position.z = 10
    // camera.rotation.z = 90 * Math.PI / 180

    // === don't forget to add everything to the scene ===
    scene.add(earth, proxima, epsilon, ross128, starBackground)
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    // === binds threejs variables to react component ===
    this.scene = scene
    this.camera = camera
    this.renderer = renderer

    // === star background & planets imported from /planets ===
    this.starBackground = starBackground
    this.earth = earth
    this.proxima = proxima
    this.epsilon = epsilon
    this.ross128 = ross128

    // === appends scene to the DOM ===
    this.mount.appendChild(this.renderer.domElement)

    // === orbit controls allows user to navigate 3D space with mouse ===
    const controls = new OrbitControls(camera, renderer.domElement)

    this.start()
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
    // === sets positions of planets ===
    this.proxima.position.set(-50, 0, -50)
    this.epsilon.position.set(80, 0, -100)
    this.ross128.position.set(100, 0, -80)

    // === sets rotations of planets ===
    this.earth.rotation.y = Date.now() * 0.0001
    // this.earth.rotation.x = Date.now() * 0.0000002
    this.proxima.rotation.y = Date.now() * 0.0003
    // this.proxima.rotation.x = Date.now() * 0.00000002
    this.epsilon.rotation.y = Date.now() * 0.0001

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        ref={mount => {
          this.mount = mount
        }}
      />
    )
  }
}
