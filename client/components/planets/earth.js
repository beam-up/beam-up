import * as THREE from '../../../three'

const geometry = new THREE.SphereGeometry(1, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/blueHole.jpg')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 1)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const earth = new THREE.Mesh(geometry, material)
earth.name = '???'

export default earth