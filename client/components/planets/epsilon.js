import * as THREE from '../../../three'

const epsilonRadius = 11.2
const geometry = new THREE.SphereGeometry(epsilonRadius, 100, 90)
const planetTexture = new THREE.TextureLoader().load(
  '/images/blueOrangeSwirl.jpg'
)
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 1)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const epsilon = new THREE.Mesh(geometry, material)

const asteroids = new THREE.Object3D()
const AU = 4
const asteroidOrbitStart = epsilonRadius + AU * 1.3,
  asteroidOrbitEnd = epsilonRadius + AU * 3.5

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min
}

const asteroidMaterial = new THREE.MeshBasicMaterial()
asteroidMaterial.map = new THREE.TextureLoader().load('/images/asteroids.jpg')

for (let i = 0; i < 4000; i++) {
  const asteroidSize = getRandomArbitrary(0.001, 0.1),
    asteroidShape1 = getRandomArbitrary(4, 10),
    asteroidShape2 = getRandomArbitrary(4, 10),
    asteroidOrbit = getRandomArbitrary(asteroidOrbitStart, asteroidOrbitEnd),
    asteroidPositionY = getRandomArbitrary(-1, 1)

  const asteroid = new THREE.Mesh(
    new THREE.SphereGeometry(asteroidSize, asteroidShape1, asteroidShape2),
    asteroidMaterial
  )

  asteroid.position.y = asteroidPositionY
  const radians = getRandomArbitrary(0, 360) * Math.PI / 180
  asteroid.position.x = Math.cos(radians) * asteroidOrbit
  asteroid.position.z = Math.sin(radians) * asteroidOrbit

  asteroids.add(asteroid)
}

// const ringStart = epsilonRadius + 3.3
// const ringEnd = epsilonRadius + 10
// const ringTexture = new THREE.TextureLoader().load('/images/epsilonRing.jpg')
// const ringMaterial = new THREE.MeshBasicMaterial({
//   map: ringTexture,
//   side: THREE.DoubleSide
// })
// const ring = new THREE.Mesh(
//   new THREE.RingGeometry(ringStart, ringEnd, 30),
//   ringMaterial
// )
// epsilon.add(ring)
// ring.rotation.x = 90 * Math.PI / 180

epsilon.add(asteroids)
epsilon.name = 'Epsilon Eridani b'

export default epsilon
