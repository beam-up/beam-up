import * as THREE from '../../three'
//Define hexagon shape for stars
   const geom = new THREE.Geometry()

   //Brackets for purely aesthetic considerations
   {
     geom.vertices.push(
       new THREE.Vector3(-0.5, 0.86, 0),
       new THREE.Vector3(0.5, 0.86, 0),
       new THREE.Vector3(0.93, 0.0, 0),
       new THREE.Vector3(0.5, -0.86, 0),
       new THREE.Vector3(-0.5, -0.86, 0),
       new THREE.Vector3(-0.93, 0.0, 0)
     )
   }

   geom.faces.push(new THREE.Face3(0, 1, 2))
   geom.faces.push(new THREE.Face3(0, 2, 3))
   geom.faces.push(new THREE.Face3(0, 3, 4))
   geom.faces.push(new THREE.Face3(0, 4, 5))

   geom.scale(0.3, 0.3, 0.3)

   const colour = 0x939393

   const material1 = new THREE.MeshPhongMaterial({
     color: colour,
     specular: 0xffffff,
     shininess: 100,
     side: THREE.DoubleSide,
     shading: THREE.FlatShading
   })

   const starsCount = 2000
   let newWidth = 150
   let newHeight = 150
   let depth = -150
   let stars = []

   //Generate random stars
   for (let i = 0; i < starsCount; i++) {
     const g_ = new THREE.Mesh(geom, material1)

     const x = 0.5 - Math.random()
     const y = 0.5 - Math.random()
     const z = 0.5 - Math.random()

     const star = {
       vel_x: x,
       vel_y: y,
       vel_z: z,
       geo: g_
     }

     // const randomNum = Math.random() * 2 - 1

     star.geo.position.x = newWidth / 2 - Math.random() * newWidth
     star.geo.position.y = newHeight / 2 - Math.random() * newHeight
     star.geo.position.z = depth / 2 - Math.random() * depth

     star.geo.rotation.x = 2 * (Math.random() - 1.0)
     star.geo.rotation.y = 2 * (Math.random() - 1.0)
     star.geo.rotation.z = 2 * (Math.random() - 1.0)

     star.geo.direction = {
       x: Math.random(),
       y: Math.random()
     }

     stars.push(star)
   }
   

  export {stars, starsCount}


  //  this.starsCount = starsCount
  //  this.starss = starss