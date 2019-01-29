import * as THREE from '../../../three'

const geometry3 = new THREE.SphereGeometry(11.2, 100, 90)
const planetTexture3 = new THREE.TextureLoader().load('/images/purple.png')
planetTexture3.wrapS = planetTexture3.wrapT = THREE.MirroredRepeatWrapping
planetTexture3.repeat.set(2, 2)
const material3 = new THREE.MeshBasicMaterial({map: planetTexture3})
const epsilon = new THREE.Mesh(geometry3, material3)

export default epsilon
