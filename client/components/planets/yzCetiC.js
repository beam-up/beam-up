import * as THREE from '../../../three'

const geometry = new THREE.SphereGeometry(0.9, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/purple.png')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 2)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const yzCetiC = new THREE.Mesh(geometry, material)

export default yzCetiC