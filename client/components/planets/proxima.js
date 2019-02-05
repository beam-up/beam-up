import * as THREE from '../../../three'

const geometry = new THREE.SphereGeometry(1.27, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/redPurplePinkMarble.jpg')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2,1)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const proxima = new THREE.Mesh(geometry, material)
proxima.name = 'Proxima Centauri b'

export default proxima
