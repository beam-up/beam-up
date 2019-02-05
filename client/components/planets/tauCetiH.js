import * as THREE from '../../../three'

const tauCetiHMass = 1.83
const geometry = new THREE.SphereGeometry(tauCetiHMass, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/purple.png')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 2)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const tauCetiH = new THREE.Mesh(geometry, material)
tauCetiH.name = 'tau Ceti h'

const asteroids = new THREE.Object3D()
const AU = 20
const asteroidOrbitStart = tauCetiHMass + AU * 1.3,
  asteroidOrbitEnd = tauCetiHMass + AU * 2.3

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min
}

for (let i = 0; i < 2000; i++) {
  const asteroidSize = getRandomArbitrary(0.001, 0.5),
    asteroidShape1 = getRandomArbitrary(2, 5),
    asteroidShape2 = getRandomArbitrary(2, 5),
    asteroidOrbit = getRandomArbitrary(asteroidOrbitStart, asteroidOrbitEnd),
    asteroidPositionY = getRandomArbitrary(-2, 2)

  const asteroid = new THREE.Mesh(
    new THREE.SphereGeometry(asteroidSize, asteroidShape1, asteroidShape2),
    new THREE.MeshBasicMaterial({color: 0x505050})
  )

  asteroid.position.y = asteroidPositionY
  const radians = getRandomArbitrary(0, 360) * Math.PI / 180
  asteroid.position.x = Math.cos(radians) * asteroidOrbit
  asteroid.position.z = Math.sin(radians) * asteroidOrbit

  asteroids.add(asteroid)
}
tauCetiH.add(asteroids)

export default tauCetiH
