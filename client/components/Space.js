import React from 'react'
import * as THREE from '../../three'
const OrbitControls = require('../../OrbitControls')(THREE)

export default class Space extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      elapsed: 0,
      particlesDelay: 1,
      sphereGeometry: {},
      sphere: {}
    }

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
    this.renderScene = this.renderScene.bind(this)
  }

  componentDidMount() {
    const width = window.innerWidth/2
    const height = window.innerHeight/2
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



      //floating-star-dust
    // const particleCount = 500
    // const particles = []

    // function fillScene() {
    //   var particleGeometry = new THREE.SphereGeometry(0.03, 32, 32) // size, number of polys to form this circle
    //   var particleMaterial = new THREE.MeshBasicMaterial({
    //     color: 0xffffff,
    //     transparent: true,
    //     opacity: 0.6
    //   })
    //   const starDustGroup = new THREE.Group()
    //   // create a random set of particles
    //   for (var i = 0; i < particleCount; i++) {
    //     particles[i] = new THREE.Mesh(particleGeometry, particleMaterial)

    //     //randomize positions
    //     particles[i].position.x =
    //       Math.random() * window.innerWidth * 2 - window.innerWidth
    //     particles[i].position.y =
    //       Math.random() * window.innerHeight * 2 - window.innerHeight
    //     particles[i].position.z =
    //       Math.random() * window.innerWidth * 2 - window.innerWidth

    //     particles[i].direction = {
    //       x: Math.random(),
    //       y: Math.random()
    //     }
    //     starDustGroup.add(particles[i])
    //   }

    // scene.add(starDustGroup)

    // }

    // fillScene()

    //Define hexagon shape for flakes
var geom = new THREE.Geometry();



//Brackets for purely aesthetic considerations
{
  geom.vertices.push(
    new THREE.Vector3(   -0.5,  0.86, 0 ),
    new THREE.Vector3(    0.5,  0.86, 0 ),
    new THREE.Vector3(    0.93, 0.0,  0 ),
      new THREE.Vector3(    0.5, -0.86, 0 ),
      new THREE.Vector3(   -0.5, -0.86, 0 ),
      new THREE.Vector3(   -0.93, 0.0, 0 )
      );
    }

geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
geom.faces.push( new THREE.Face3( 0, 2, 3 ) );
geom.faces.push( new THREE.Face3( 0, 3, 4 ) );
geom.faces.push( new THREE.Face3( 0, 4, 5 ) );

geom.scale(.3,.3,.3);

var colour = 0x939393;

var material1 = new THREE.MeshPhongMaterial( {color: colour, specular: 0xffffff, shininess: 100, side: THREE.DoubleSide, shading: THREE.FlatShading} );

const flakeCount = 2000
let newWidth = 150
let newHeight = 150
let depth = -150
let flakes = []


//Generate random flakes
for(let i = 0; i < flakeCount; i++){

  var g_ = new THREE.Mesh(geom, material1);

  var x = 0.5 - Math.random();
  var y = 0.5 - Math.random();
  var z = 0.5 - Math.random();

  var flake = {
    vel_x: x,
    vel_y: y,
    vel_z: z,
    geo: g_
  };

  // const randomNum = Math.random() * 2 - 1

  flake.geo.position.x = newWidth/2 - Math.random() * newWidth;
  flake.geo.position.y = newHeight/2 -  Math.random() * newHeight;
  flake.geo.position.z = depth/2 -  Math.random() * depth;

  flake.geo.rotation.x = 2 * (Math.random() - 1.0);
  flake.geo.rotation.y = 2 * (Math.random() - 1.0);
  flake.geo.rotation.z = 2 * (Math.random() - 1.0);

  flakes.push(flake);
}
for(let i = 0; i < flakes.length; i++){
  scene.add(flakes[i].geo);
}
console.log('am I here???')


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
    console.log('cameraView',camera.near)
    // camera.position.set(0, 0, 200)
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
    light.position.set(200, 100, 200);
    light.castShadow = true;
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
    // this.particles = particles
    // this.particleCount = particleCount
    this.controls = controls
    this.flakes = flakes
    // this.elapsed = elapsed



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
    // this.elapsed += 1;
    // this.update();
    this.renderer.render(this.scene, this.camera)
  }

  animate() {
    // stardust motion

    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.25
    for (var i = 0; i < this.particleCount; i++) {
      this.particles[i].position.x += this.particles[i].direction.x
      this.particles[i].position.y += this.particles[i].direction.y

      // if edge is reached, bounce back
      if (
        this.particles[i].position.x < - window.innerWidthwidth ||
        this.particles[i].position.x > window.innerWidthwidth
      ) {
        this.particles[i].direction.x = - this.particles[i].direction.x
      }
      if (
        this.particles[i].position.y < - window.innerHeight ||
        this.particles[i].position.y > window.innerHeight
      ) {
        this.particles[i].direction.y = - this.particles[i].direction.y
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


