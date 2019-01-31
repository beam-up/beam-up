import * as THREE from '../../three'

// === dimensions for star cube that surrounds space sphere ===
let starCubeW = 400
let starCubeH = 400
let starCubeD = 400
let starCubeNegH = -400
let stars = []

//create geometry for stars
const geom = new THREE.IcosahedronGeometry(0.5)
// wrap each star in pastel dream pic for texture
const material = new THREE.MeshBasicMaterial()
material.map = new THREE.TextureLoader().load('/images/star.png')

// === creates 2000 floating stars ===
for (let i = 0; i < 2000; i++) {
  const mesh = new THREE.Mesh(geom, material)
  mesh.position.x = Math.random() * (starCubeW - 1) + 1
  mesh.position.z = Math.random() * (starCubeD - 1) - 1
  // if first half of stars, populate them in top half of sphere
  if (i < 1000) {
    mesh.position.y = Math.random() * (starCubeH - 1) + 1
    // if second half of stars, populate them in bottom half of sphere
  } else {
    mesh.position.y = Math.random() * (starCubeNegH - 1) + 1
  }
  stars.push(mesh)
}

export {stars, starCubeH, starCubeW}
