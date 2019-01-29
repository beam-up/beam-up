import * as THREE from '../../../three'

const geometry4 = new THREE.SphereGeometry(1.4, 100, 90)
const planetTexture4 = new THREE.TextureLoader().load('/images/purple.png')
planetTexture4.wrapS = planetTexture4.wrapT = THREE.MirroredRepeatWrapping
planetTexture4.repeat.set(2, 2)
const material4 = new THREE.MeshBasicMaterial({map: planetTexture4})
const ross128 = new THREE.Mesh(geometry4, material4)

export default ross128
