import * as THREE from '../../../three'

const epsilonRadius = 11.2
const geometry = new THREE.SphereGeometry(epsilonRadius, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/blueOrangeSwirl.jpg')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 1)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const epsilon = new THREE.Mesh(geometry, material)

const ringStart = epsilonRadius + 3.3
const ringEnd = epsilonRadius + 10
const ringTexture = new THREE.TextureLoader().load('/images/epsilonRing.jpg')
const ringMaterial = new THREE.MeshBasicMaterial({
  map: ringTexture,
  side: THREE.DoubleSide
})
const ring = new THREE.Mesh(
  new THREE.RingGeometry(ringStart, ringEnd, 30),
  ringMaterial
)
epsilon.add(ring)
ring.rotation.x = 90 * Math.PI / 180

epsilon.name = 'Epsilon Eridani b'

export default epsilon
