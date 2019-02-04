import * as THREE from '../../three'

// === dimensions for star cube that surrounds space sphere ===
let starCubeW = 400
let starCubeH = 400
let starCubeD = 400
let starCubeNegH = -400
let diamonds = []

// === create geometry for diamonds ===
const geom = new THREE.Geometry()

// diamond cap
const capGeometry = new THREE.CylinderGeometry(0.7, 1.1, 0.3, 7, 1, false)
const capMatrix = new THREE.Matrix4().makeTranslation(
  0,
  +capGeometry.parameters.height / 2,
  0
)
geom.merge(capGeometry, capMatrix)

// diamond point
const ptGeometry = new THREE.CylinderGeometry(1.1, 0, 1, 7, 1, false)
const ptMatrix = new THREE.Matrix4().makeTranslation(
  0,
  -ptGeometry.parameters.height / 2,
  0
)
geom.merge(ptGeometry, ptMatrix)

const material = new THREE.MeshBasicMaterial()
material.map = new THREE.TextureLoader().load('/images/Piggy-Pink.jpg')

// === creates 30 floating diamonds ===
for (let i = 0; i < 30; i++) {
  const mesh = new THREE.Mesh(geom, material)
  mesh.position.x = Math.random() * (starCubeW - 1) + 1
  mesh.position.z = Math.random() * (starCubeD - 1) - 1
  // if first half of diamonds, populate them in top half of sphere
  if (i < 15) {
    mesh.position.y = Math.random() * (starCubeH - 1) + 1
    // if second half of diamonds, populate them in bottom half of sphere
  } else {
    mesh.position.y = Math.random() * (starCubeNegH - 1) + 1
  }
  //set size of diamonds
  mesh.scale.x = mesh.scale.y = mesh.scale.z = 4
  mesh.name = 'wishDiamond'
  diamonds.push(mesh)
}

export {diamonds}
