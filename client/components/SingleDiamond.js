import React, {Component} from 'react'

import * as THREE from '../../three'

import {starBackground} from './planets'

export default class WishSubmitted extends Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }

  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({antialias: true})

    const material = new THREE.MeshBasicMaterial()
    material.map = new THREE.TextureLoader().load('/images/Piggy-Pink.jpg')

    const geom = new THREE.Geometry()

    // diamond cap
    const capGeometry = new THREE.CylinderGeometry(0.7, 1.1, 0.3, 7, 1, false)
    const capMatrix = new THREE.Matrix4().makeTranslation(
      0,
      +capGeometry.parameters.height / 2,
      0
    )
    geom.merge(capGeometry, capMatrix)

    // diamond point
    const ptGeometry = new THREE.CylinderGeometry(1.1, 0, 1, 7, 1, false)
    const ptMatrix = new THREE.Matrix4().makeTranslation(
      0,
      -ptGeometry.parameters.height / 2,
      0
    )
    geom.merge(ptGeometry, ptMatrix)

    const diamond = new THREE.Mesh(geom, material)

    camera.position.y = -2
    camera.position.z = 8
    scene.add(diamond)
    // renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    const light = new THREE.PointLight(0xffff00)
    light.position.set(10, 0, 10)
    scene.add(light)

    scene.add(starBackground)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.diamond = diamond
    this.light = light
    this.starBackground = starBackground

    this.mount.appendChild(this.renderer.domElement)
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
    // this.diamond.rotation.x += 0.01
    this.diamond.position.set(0, 5, 0)

    this.diamond.rotation.y -= 1

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <div id="wishSubmitted">
          <div
            style={{width: '100vw', height: '100vh'}}
            ref={mount => {
              this.mount = mount
            }}
          />
          <p id="wishSubmittedMessage"> u submitted. nice </p>
        </div>
      </Animated>
    )
  }
}
