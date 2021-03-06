import * as THREE from '../../../three'

const geometry = new THREE.SphereGeometry(1.4, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/purpleSwirl.jpg')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 1)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const ross128 = new THREE.Mesh(geometry, material)
ross128.name = 'Ross 128 b'

export default ross128
