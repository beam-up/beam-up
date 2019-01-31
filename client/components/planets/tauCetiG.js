import * as THREE from '../../../three'

const geometry = new THREE.SphereGeometry(1.75, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/purple.png')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 2)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const tauCetiG = new THREE.Mesh(geometry, material)
tauCetiG.name = 'tau Ceti g'

export default tauCetiG
