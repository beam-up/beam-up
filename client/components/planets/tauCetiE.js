import * as THREE from '../../../three'

const tauCetiEMass = 3.93
const geometry = new THREE.SphereGeometry(tauCetiEMass, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/purple.png')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 2)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const tauCetiE = new THREE.Mesh(geometry, material)
tauCetiE.name = 'tau Ceti e'

export default tauCetiE
