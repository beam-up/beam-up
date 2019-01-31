import * as THREE from '../../../three'

// this is the tau ceti star
// arrived at 85 for size b/c yz ceti's radius is 78% of the sun's radius
// earth's radius = 1 in our scale. sun's radius is 109x earth's. 78% of 109 is 85.
const geometry = new THREE.SphereGeometry(85, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/purple.png')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 2)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const tauCeti = new THREE.Mesh(geometry, material)
tauCeti.name = 'tauCeti'

export default tauCeti
