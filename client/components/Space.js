import React from 'react'
import * as THREE from '../../three'
// import OrbitControls from '../../OrbitControls'
// import 'three/examples/js/controls/OrbitControls'
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

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000)
    const renderer = new THREE.WebGLRenderer({antialias: true})

    // starfield background
    // create the geometry sphere
    const starGeometry = new THREE.SphereGeometry(90, 32, 32)
    // create the material, using a texture of startfield
    const starMaterial = new THREE.MeshBasicMaterial()
    starMaterial.map = new THREE.TextureLoader().load(
      '/images/galaxy_starfield-2.png'
    )
    starMaterial.side = THREE.BackSide
    // create the mesh based on geometry and material
    const starfield = new THREE.Mesh(starGeometry, starMaterial)

    // planet 1 - big one
    const geometry = new THREE.SphereGeometry(0.51, 15, 10)
    const planetTexture = new THREE.TextureLoader().load('/images/planet.png')
    planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
    planetTexture.repeat.set(2, 2)
    const material = new THREE.MeshBasicMaterial({map: planetTexture})
    const sphere1 = new THREE.Mesh(geometry, material)

    // planet 2 - small one
    const geometry2 = new THREE.SphereGeometry(0.16, 15, 10)
    const planetTexture2 = new THREE.TextureLoader().load('/images/purple.png')
    planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
    planetTexture.repeat.set(2, 2)
    const material2 = new THREE.MeshBasicMaterial({map: planetTexture2})
    const sphere2 = new THREE.Mesh(geometry2, material2)

    // resizes browser window
    window.addEventListener(
      'resize',
      function() {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
      },
      false
    )

    // camera.position.set(0, 0, 200)
    camera.position.z = 1.5

    //don't forget to add everything to the scene
    scene.add(sphere1, sphere2, starfield)
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.sphere1 = sphere1
    this.sphere2 = sphere2
    this.starfield = starfield

    this.mount.appendChild(this.renderer.domElement)
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
    // sets positions of planets
    this.sphere2.position.set(1, 1, 1)

    // sets rotations of planets
    this.sphere1.rotation.y = Date.now() * 0.0002
    this.sphere1.rotation.x = Date.now() * 0.0000002
    this.sphere2.rotation.y = Date.now() * 0.0008
    this.sphere2.rotation.x = Date.now() * 0.00000002

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

