import * as THREE from '../../../three'

const geometry = new THREE.SphereGeometry(11.2, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/purple.png')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 2)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const epsilon = new THREE.Mesh(geometry, material)
epsilon.name = 'Epsilon Eridani b'

export default epsilon
