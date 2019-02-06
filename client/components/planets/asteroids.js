import * as THREE from '../../../three'

const tauCeti = 2
const asteroids = new THREE.Object3D()
const AU = 25
const asteroidOrbitStart = tauCeti + AU * 1.3,
  asteroidOrbitEnd = tauCeti + AU * 2.3

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min
}

for (let i = 0; i < 3000; i++) {
  const asteroidSize = getRandomArbitrary(0.001, 0.1),
    asteroidShape1 = getRandomArbitrary(2, 5),
    asteroidShape2 = getRandomArbitrary(2, 5),
    asteroidOrbit = getRandomArbitrary(asteroidOrbitStart, asteroidOrbitEnd),
    asteroidPositionY = getRandomArbitrary(-2, 2)

  const asteroid = new THREE.Mesh(
    new THREE.SphereGeometry(asteroidSize, asteroidShape1, asteroidShape2),
    new THREE.MeshBasicMaterial(),
    new THREE.TextureLoader().load('/images/purpleDarkMarble.jpg')
  )

  asteroid.position.y = asteroidPositionY
  const radians = getRandomArbitrary(0, 360) * Math.PI / 180
  asteroid.position.x = Math.cos(radians) * asteroidOrbit
  asteroid.position.z = Math.sin(radians) * asteroidOrbit

  asteroids.add(asteroid)
}

export default asteroids
