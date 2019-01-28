import * as THREE from 'three'
var OrbitControls = require('three-orbit-controls')(THREE)

export default function stardustBackground() {
  var scene, camera, renderer, controls
  var canvas = document.getElementById('canvas')

  // particles set up
  var particleCount = 500
  var particles = []

  init()
  animate()

  function fillScene() {
    var particleGeometry = new THREE.SphereGeometry(5, 32, 32) // size, number of polys to form this circle
    var particleMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6
    })

    // create a random set of particles
    for (var i = 0; i < particleCount; i++) {
      particles[i] = new THREE.Mesh(particleGeometry, particleMaterial)

      //randomize positions
      particles[i].position.x =
        Math.random() * window.innerWidth * 2 - window.innerWidth
      particles[i].position.y =
        Math.random() * window.innerHeight * 2 - window.innerHeight
      particles[i].position.z =
        Math.random() * window.innerWidth * 2 - window.innerWidth

      particles[i].direction = {
        x: Math.random(),
        y: Math.random()
      }

      scene.add(particles[i])
    }
  }

  function init() {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )
    camera.position.z = 1000

    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0x31aed1, 1)
    renderer.setSize(window.innerWidth, window.innerHeight)

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.enableZoom = false

    fillScene()
    canvas.appendChild(renderer.domElement)
    renderer.render(scene, camera)
  }

  function animate() {
    requestAnimationFrame(animate)
    controls.update()

    for (var i = 0; i < particleCount; i++) {
      particles[i].position.x += particles[i].direction.x
      particles[i].position.y += particles[i].direction.y

      // if edge is reached, bounce back
      if (
        particles[i].position.x < -window.innerWidth ||
        particles[i].position.x > window.innerWidth
      ) {
        particles[i].direction.x = -particles[i].direction.x
      }
      if (
        particles[i].position.y < -window.innerHeight ||
        particles[i].position.y > window.innerHeight
      ) {
        particles[i].direction.y = -particles[i].direction.y
      }
    }

    renderer.render(scene, camera)
  }
}
