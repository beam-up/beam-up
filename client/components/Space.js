import React from 'react'
import * as THREE from '../../three'
const OrbitControls = require('../../OrbitControls')(THREE)

export default class Space extends React.Component {
  constructor(props) {
    super(props)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
    this.renderScene = this.renderScene.bind(this)
  }

  componentDidMount() {
    const width = window.innerWidth
    const height = window.innerHeight
    const scene = new THREE.Scene()

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
    scene.add(starfield)

    //Define hexagon shape for flakes
    var geom = new THREE.Geometry()

    //Brackets for purely aesthetic considerations
    {
      geom.vertices.push(
        new THREE.Vector3(-0.5, 0.86, 0),
        new THREE.Vector3(0.5, 0.86, 0),
        new THREE.Vector3(0.93, 0.0, 0),
        new THREE.Vector3(0.5, -0.86, 0),
        new THREE.Vector3(-0.5, -0.86, 0),
        new THREE.Vector3(-0.93, 0.0, 0)
      )
    }

    geom.faces.push(new THREE.Face3(0, 1, 2))
    geom.faces.push(new THREE.Face3(0, 2, 3))
    geom.faces.push(new THREE.Face3(0, 3, 4))
    geom.faces.push(new THREE.Face3(0, 4, 5))

    geom.scale(0.3, 0.3, 0.3)

    var colour = 0x939393

    var material1 = new THREE.MeshPhongMaterial({
      color: colour,
      specular: 0xffffff,
      shininess: 100,
      side: THREE.DoubleSide,
      shading: THREE.FlatShading
    })

    const flakeCount = 2000
    let newWidth = 150
    let newHeight = 150
    let depth = -150
    let flakes = []

    //Generate random flakes
    for (let i = 0; i < flakeCount; i++) {
      var g_ = new THREE.Mesh(geom, material1)

      var x = 0.5 - Math.random()
      var y = 0.5 - Math.random()
      var z = 0.5 - Math.random()

      var flake = {
        vel_x: x,
        vel_y: y,
        vel_z: z,
        geo: g_
      }

      // const randomNum = Math.random() * 2 - 1

      flake.geo.position.x = newWidth / 2 - Math.random() * newWidth
      flake.geo.position.y = newHeight / 2 - Math.random() * newHeight
      flake.geo.position.z = depth / 2 - Math.random() * depth

      flake.geo.rotation.x = 2 * (Math.random() - 1.0)
      flake.geo.rotation.y = 2 * (Math.random() - 1.0)
      flake.geo.rotation.z = 2 * (Math.random() - 1.0)

      flake.geo.direction = {
        x: Math.random(),
        y: Math.random()
      }

      flakes.push(flake)
    }
    for (let i = 0; i < flakes.length; i++) {
      scene.add(flakes[i].geo)
    }


    // planet 1 - big one
    const geometry = new THREE.SphereGeometry(0.51, 15, 10)
    const planetTexture = new THREE.TextureLoader().load('/images/planet.png')
    planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
    planetTexture.repeat.set(2, 2)
    const material = new THREE.MeshBasicMaterial({map: planetTexture})
    const sphere1 = new THREE.Mesh(geometry, material)
    scene.add(sphere1)

    // planet 2 - small one
    const geometry2 = new THREE.SphereGeometry(0.16, 15, 10)
    const planetTexture2 = new THREE.TextureLoader().load('/images/purple.png')
    planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
    planetTexture.repeat.set(2, 2)
    const material2 = new THREE.MeshBasicMaterial({map: planetTexture2})
    const sphere2 = new THREE.Mesh(geometry2, material2)
    scene.add(sphere2)

    // create a renderer
    const renderer = new THREE.WebGLRenderer({antialias: true})
    console.log('renderer - new???', renderer)
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)
    // this.mount.appendChild(renderer.domElement)

    // create a camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000)
    console.log('cameraView', camera.near)
    camera.position.z = 1.5
    const controls = new OrbitControls(camera, renderer.domElement)
    // controls.maxDistance = 10
    // controls.maxDistance = 2

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

    //lighting
    const ambientLight = new THREE.AmbientLight(0x999999)
    scene.add(ambientLight)
    const light = new THREE.DirectionalLight(0xffffff, 1.5)
    light.position.set(200, 100, 200)
    light.castShadow = true
    scene.add(light)

    // add planets to Scene
    // scene.add(sphere1, sphere2, starfield)
    // tried to add star field as background instead of an element

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.sphere1 = sphere1
    this.sphere2 = sphere2
    this.starfield = starfield
    this.flakeCount = flakeCount
    this.controls = controls
    this.flakes = flakes
    this.newWidth = newWidth
    this.newHeight = newHeight
    this.mount.appendChild(this.renderer.domElement)
    // const controls = new OrbitControls(camera, renderer.domElement)
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

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  animate() {
    // stardust motion

    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.25
    for (var i = 0; i < this.flakeCount; i++) {
      this.flakes[i].geo.position.x += this.flakes[i].geo.direction.x/2
      this.flakes[i].geo.position.y += this.flakes[i].geo.direction.y/2
      console.log('updated')
      // if edge is reached, bounce back
      if (
        this.flakes[i].geo.position.x < - this.newWidth ||
        this.flakes[i].geo.position.x > this.newWidth
      ) {
        this.flakes[i].geo.direction.x = -this.flakes[i].geo.direction.x
      }
      if (
        this.flakes[i].geo.position.y < - this.newHeight ||
        this.flakes[i].geo.position.y > this.newHeight
      ) {
        this.flakes[i].geo.direction.y = -this.flakes[i].geo.direction.y
      }
    }

    // sets positions of planets
    this.sphere2.position.set(1, 1, 1)

    // sets rotations of planets
    this.sphere1.rotation.y = Date.now() * 0.0002
    this.sphere1.rotation.x = Date.now() * 0.0000002
    this.sphere2.rotation.y = Date.now() * 0.0008
    this.sphere2.rotation.x = Date.now() * 0.00000002

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
    this.controls.update()
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
