import * as THREE from '../../../three'

const geometry2 = new THREE.SphereGeometry(1.27, 100, 90)
const planetTexture2 = new THREE.TextureLoader().load('/images/purple.png')
planetTexture2.wrapS = planetTexture2.wrapT = THREE.MirroredRepeatWrapping
planetTexture2.repeat.set(2, 2)
const material2 = new THREE.MeshBasicMaterial({map: planetTexture2})
const proxima = new THREE.Mesh(geometry2, material2)

export default proxima
