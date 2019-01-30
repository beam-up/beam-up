import * as THREE from '../../../three'

const geometry = new THREE.SphereGeometry(1.14, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/planet.png')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 2)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const yzCetiD = new THREE.Mesh(geometry, material)

export default yzCetiD