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

  // init(){

  // }

  componentDidMount() {
    const width = window.innerWidth
    const height = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000)
    const renderer = new THREE.WebGLRenderer({antialias: true})

    // starfield background
    // create the geometry sphere
    const starGeometry = new THREE.SphereGeometry(200, 32, 32)
    // create the material, using a texture of startfield
    const starMaterial = new THREE.MeshBasicMaterial()
    starMaterial.map = new THREE.TextureLoader().load(
      '/images/galaxy_starfield-2.png'
    )
    starMaterial.side = THREE.BackSide
    // create the mesh based on geometry and material
    const starfield = new THREE.Mesh(starGeometry, starMaterial)

    // planet 1 - Earth
    const geometry = new THREE.SphereGeometry(1, 100, 90)
    const planetTexture = new THREE.TextureLoader().load('/images/planet.png')
    planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
    planetTexture.repeat.set(2, 2)
    const material = new THREE.MeshBasicMaterial({map: planetTexture})
    const earth = new THREE.Mesh(geometry, material)

    // planet 2 - Proxima Centauri b
    const geometry2 = new THREE.SphereGeometry(1.27, 100, 90)
    const planetTexture2 = new THREE.TextureLoader().load('/images/purple.png')
    planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
    planetTexture.repeat.set(2, 2)
    const material2 = new THREE.MeshBasicMaterial({map: planetTexture2})
    const proxima = new THREE.Mesh(geometry2, material2)

    // planet 3 - Epsilon Eridani b
    const geometry3 = new THREE.SphereGeometry(11.2, 100, 90)
    const planetTexture3 = new THREE.TextureLoader().load('/images/purple.png')
    planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
    planetTexture.repeat.set(2, 2)
    const material3 = new THREE.MeshBasicMaterial({map: planetTexture3})
    const epsilon = new THREE.Mesh(geometry3, material3)

    // planet 4 - Ross 128 b
    const geometry4 = new THREE.SphereGeometry(1.4, 100, 90)
    const planetTexture4 = new THREE.TextureLoader().load('/images/purple.png')
    planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
    planetTexture.repeat.set(2, 2)
    const material4 = new THREE.MeshBasicMaterial({map: planetTexture4})
    const ross128 = new THREE.Mesh(geometry4, material4)

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

    // camera.position.set(0, 0, 10)
    camera.position.z = 10

    // camera.rotation.z = 90 * Math.PI / 180

    //don't forget to add everything to the scene
    scene.add(earth, proxima, epsilon, ross128, starfield)
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.starfield = starfield
    this.earth = earth
    this.proxima = proxima
    this.epsilon = epsilon
    this.ross128 = ross128

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
    this.proxima.position.set(-50, 0, 0)
    this.epsilon.position.set(80, 0, -100)
    this.ross128.position.set(100, 0, -80)

    // sets rotations of planets
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
