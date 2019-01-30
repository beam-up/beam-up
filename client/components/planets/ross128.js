import * as THREE from '../../../three'

const geometry = new THREE.SphereGeometry(1.4, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/purple.png')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 2)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const ross128 = new THREE.Mesh(geometry, material)

export default ross128
