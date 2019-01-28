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
    console.log(width)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      100000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    const geometry = new THREE.SphereGeometry(200,15,10)
    const planetTexture = new THREE.TextureLoader().load( "/images/planet.png" );
    planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping;
    planetTexture.repeat.set( 2, 2 );
    const material = new THREE.MeshBasicMaterial( { map: planetTexture } );
    const sphere1 = new THREE.Mesh( geometry, material );
    

    const geometry2 = new THREE.SphereGeometry(50,15,10)
    const planetTexture2 = new THREE.TextureLoader().load( "/images/purple.png" );
    planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping;
    planetTexture.repeat.set( 2, 2 );
    const material2 = new THREE.MeshBasicMaterial( { map: planetTexture2 } );
    const sphere2 = new THREE.Mesh( geometry2, material2 );

    window.addEventListener(
      'resize',
      function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      },
      false
    );

    camera.position.set(0,0,800);
    scene.add(sphere1, sphere2)
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.sphere1 = sphere1
    this.sphere2 = sphere2

    this.mount.appendChild(this.renderer.domElement)
    const controls = new OrbitControls( camera, renderer.domElement)
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
        this.sphere2.position.set(400, 200, 200);
        this.sphere1.rotation.y = Date.now() * 0.0002;
        this.sphere1.rotation.x = Date.now() * 0.0000002;
        this.sphere2.rotation.y = Date.now() * 0.0008;
        this.sphere2.rotation.x = Date.now() * 0.00000002;

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

// ReactDOM.render(<Space />, document.getElementById('root'))