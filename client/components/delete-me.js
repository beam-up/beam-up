// --- cleaning console --- //
console.clear()

// --- threeJS --- //
var renderer, scene, camera, distance, raycaster, projector

var container = document.getElementById('container')
var raycaster = new THREE.Raycaster(),
  INTERSECTED
var mouse = new THREE.Vector2()
var distance = 400

// -- basic initialization -- //
function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x140b33, 1)
  container.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.2,
    25000
  )
  camera.position.set(100, 100, 2000)
  scene.add(camera)

  light = new THREE.PointLight(0xffffff, 1, 4000)
  light.position.set(50, 0, 0)
  light_two = new THREE.PointLight(0xffffff, 1, 4000)
  light_two.position.set(-100, 800, 800)
  lightAmbient = new THREE.AmbientLight(0x404040)
  scene.add(light, light_two, lightAmbient)

  createSpheres()

  createDiamond()

  createSpace()

  renderer.render(scene, camera)

  document.addEventListener('mousemove', onMouseMove, false)
  document.addEventListener('mousedown', onDocumentMouseDown, false)
  window.addEventListener('resize', onWindowResize, false)
}

// -- diamonds -- //
function createDiamond() {
  diamondsGroup = new THREE.Object3D()

  var arr = [
    'http://topotopo.io/',
    'https://panic.com/transmit/',
    'http://www.larsberg.net/',
    'http://www.robertadicamerino.com/',
    'https://tonite.dance/',
    'https://moments.epic.net/',
    'http://www.welcometofillory.com/map',
    'http://www.veilhymn.com/',
    'http://swissarmyman.com/',
    'https://aframe.io/',
    'http://www.dennis.video/',
    'http://a-way-to-go.com/',
    'http://www.simonreeves.com/projects/db5/'
  ]

  var loader = new THREE.JSONLoader()
  loader.load(
    'https://raw.githubusercontent.com/PavelLaptev/test-rep/master/threejs-post/diamond.json',
    function(geometry) {
      for (var i = 0; i < 60; i++) {
        var material = new THREE.MeshPhongMaterial({
          color: Math.random() * 0xff00000 - 0xff00000,
          shading: THREE.FlatShading
        })
        var diamond = new THREE.Mesh(geometry, material)
        diamond.position.x = Math.random() * -distance * 6
        diamond.position.y = Math.random() * -distance * 2
        diamond.position.z = Math.random() * distance * 3
        diamond.rotation.y = Math.random() * 2 * Math.PI
        diamond.scale.x = diamond.scale.y = diamond.scale.z =
          Math.random() * 50 + 10

        diamond.userData = {
          URL: arr[Math.floor(Math.random() * arr.length)]
        }
        diamondsGroup.add(diamond)
      }
      diamondsGroup.position.x = 1400
      scene.add(diamondsGroup)
    }
  )
}

// -- spheres -- //
function createSpheres() {
  spheres = new THREE.Object3D()

  for (var i = 0; i < 80; i++) {
    var sphere = new THREE.SphereGeometry(
      4,
      Math.random() * 12,
      Math.random() * 12
    )
    var material = new THREE.MeshPhongMaterial({
      color: Math.random() * 0xff00000 - 0xff00000,
      shading: THREE.FlatShading
    })

    var particle = new THREE.Mesh(sphere, material)
    particle.position.x = Math.random() * distance * 10
    particle.position.y = Math.random() * -distance * 6
    particle.position.z = Math.random() * distance * 4
    particle.rotation.y = Math.random() * 2 * Math.PI
    particle.scale.x = particle.scale.y = particle.scale.z =
      Math.random() * 12 + 5
    spheres.add(particle)
  }

  spheres.position.y = 500
  spheres.position.x = -2000
  spheres.position.z = -100
  spheres.rotation.y = Math.PI * 600

  scene.add(spheres)
}

// -- dots on the back -- //
function createSpace() {
  dots = new THREE.Object3D()

  for (var i = 0; i < 420; i++) {
    var circleGeometry = new THREE.SphereGeometry(
      2,
      Math.random() * 5,
      Math.random() * 5
    )
    var material = new THREE.MeshBasicMaterial({
      color: Math.random() * 0xff00000 - 0xff00000,
      shading: THREE.FlatShading
    })
    var circle = new THREE.Mesh(circleGeometry, material)
    material.side = THREE.DoubleSide

    circle.position.x = Math.random() * -distance * 50
    circle.position.y = Math.random() * -distance * 8
    circle.position.z = Math.random() * distance * 5
    circle.rotation.y = Math.random() * 2 * Math.PI
    circle.scale.x = circle.scale.y = circle.scale.z = Math.random() * 6 + 5
    dots.add(circle)
  }

  dots.position.x = 7000
  dots.position.y = 1500
  dots.position.z = -2000
  dots.rotation.y = Math.PI * 600
  dots.rotation.z = Math.PI * 500

  scene.add(dots)
}

// -- events -- //
function onMouseMove(event) {
  mouse.x = event.clientX / window.innerWidth * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  mouseX = event.clientX - window.innerWidth / 2
  mouseY = event.clientY - window.innerHeight / 2
  camera.position.x += (mouseX - camera.position.x) * 0.01
  camera.position.y += (mouseY - camera.position.y) * 0.01
  camera.lookAt(scene.position)
}

function onDocumentMouseDown(event) {
  event.preventDefault()
  mouse.x = event.clientX / window.innerWidth * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  var intersects = raycaster.intersectObjects(diamondsGroup.children)
  if (intersects.length > 0) {
    window.open(intersects[0].object.userData.URL)
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.updateProjectionMatrix()
}

// ---- //
function animate() {
  requestAnimationFrame(animate)
  render()
}

// -- render all -- //
function render() {
  var timer = 0.00001 * Date.now()

  for (var i = 0, l = diamondsGroup.children.length; i < l; i++) {
    var object = diamondsGroup.children[i]
    object.position.y = 500 * Math.cos(timer + i)
    object.rotation.y += Math.PI / 500
  }

  for (var i = 0, l = spheres.children.length; i < l; i++) {
    var object = spheres.children[i]
    object.rotation.y += Math.PI / 60
    if (i < 20) {
      object.rotation.y -= Math.PI / 40
    }
  }

  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera)

  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(diamondsGroup.children)

  if (intersects.length > 0) {
    if (INTERSECTED != intersects[0].object) {
      if (INTERSECTED)
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)
      INTERSECTED = intersects[0].object
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex()
      INTERSECTED.material.emissive.setHex(
        Math.random() * 0xff00000 - 0xff00000
      )
    }
  } else {
    if (INTERSECTED)
      INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)
    INTERSECTED = null
  }

  renderer.render(scene, camera)
}

// -- run functions -- //
init()
animate()
