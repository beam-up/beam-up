import * as THREE from '../../../three'

const geometry = new THREE.SphereGeometry(3.93, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/tealOpalMarble.jpg')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 1)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const tauCetiF = new THREE.Mesh(geometry, material)
tauCetiF.name = 'tau Ceti f'

export default tauCetiF
