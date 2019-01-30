import * as THREE from '../../../three'

// star background
// create the geometry sphere
const starGeometry = new THREE.SphereGeometry(400, 32, 32)
// create the material, using a texture of starfield
const starMaterial = new THREE.MeshBasicMaterial()
starMaterial.map = new THREE.TextureLoader().load('/images/starfield.png')
starMaterial.side = THREE.BackSide
// create the mesh based on geometry and material
const starBackground = new THREE.Mesh(starGeometry, starMaterial)

export default starBackground
