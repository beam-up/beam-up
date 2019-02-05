import * as THREE from '../../../three'

const geometry = new THREE.SphereGeometry(1.14, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/rainbowMarble2.jpg')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 1)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const yzCetiD = new THREE.Mesh(geometry, material)
yzCetiD.name = 'YZ Ceti d'
export default yzCetiD
