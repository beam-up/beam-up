import * as THREE from '../../../three'

const geometry = new THREE.SphereGeometry(7, 100, 90)
const planetTexture = new THREE.TextureLoader().load('/images/redBlueSwirl.jpeg')
planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping
planetTexture.repeat.set(2, 1)
const material = new THREE.MeshBasicMaterial({map: planetTexture})
const kapteynC = new THREE.Mesh(geometry, material)
kapteynC.name = 'Kapteyn c'

export default kapteynC
