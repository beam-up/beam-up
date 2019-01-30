import * as THREE from '../../../three'

const geometry = new THREE.SphereGeometry(7, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/blue.png')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 2)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const kapteynC = new THREE.Mesh(geometry, material)

export default kapteynC