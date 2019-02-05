import * as THREE from '../../../three'

const geometry = new THREE.SphereGeometry(1.75, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/orangeDarkMarble.jpg')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 1)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const tauCetiG = new THREE.Mesh(geometry, material)
tauCetiG.name = 'tau Ceti g'

export default tauCetiG
