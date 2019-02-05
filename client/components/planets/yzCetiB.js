import * as THREE from '../../../three'

const geometry = new THREE.SphereGeometry(0.9, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/rainbowMarble.jpg')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 1)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const yzCetiB = new THREE.Mesh(geometry, material)
yzCetiB.name = 'YZ Ceti b'
export default yzCetiB
