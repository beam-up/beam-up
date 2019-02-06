import * as THREE from '../../../three'

const tauCetiHMass = 1.83
const geometry = new THREE.SphereGeometry(tauCetiHMass, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/redNavyMarble.jpg')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 1)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const tauCetiH = new THREE.Mesh(geometry, material)
tauCetiH.name = 'tau Ceti h'

export default tauCetiH
