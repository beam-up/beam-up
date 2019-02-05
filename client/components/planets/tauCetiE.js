import * as THREE from '../../../three'

const geometry = new THREE.SphereGeometry(3.93, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/blueMarble.jpg')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 1)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const tauCetiE = new THREE.Mesh(geometry, material)
tauCetiE.name = 'tau Ceti e'

export default tauCetiE
