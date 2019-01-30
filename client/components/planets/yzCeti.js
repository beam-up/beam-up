import * as THREE from '../../../three'

// this is the yz ceti star
// arrived at 18 for size b/c yz ceti's radius is 17% of the sun's radius
// earth's radius = 1 in our scale. sun's radius is 109x earth's. 17% of 109 is 18.
const geometry = new THREE.SphereGeometry(18, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/purple.png')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 2)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const yzCeti = new THREE.Mesh(geometry, material)
yzCeti.name = 'yzCeti'

export default yzCeti
