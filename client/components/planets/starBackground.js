import * as THREE from '../../../three'

// star background
// create the geometry sphere
const starGeometry = new THREE.SphereGeometry(200, 32, 32)
// create the material, using a texture of startfield
const starMaterial = new THREE.MeshBasicMaterial()
starMaterial.map = new THREE.TextureLoader().load(
  '/images/galaxy_starfield-2.png'
)
starMaterial.side = THREE.BackSide
// create the mesh based on geometry and material
const starBackground = new THREE.Mesh(starGeometry, starMaterial)

export default starBackground
