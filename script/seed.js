'use strict'

const db = require('../server/db')
// const {User} = require('../server/db/models')
const {Planet} = require('../server/db/models')

const planetData = [
  {
    type: 'Super Earth',
    name: 'Proxima Centauri b',
    description:
      '(also called Proxima b or Alpha Centauri Cb) is a Super Earth type exoplanet orbiting in the habitable zone of the red dwarf M-type star Proxima Centauri, which is the closest star to the Sun and part of a triple star system. Its mass is at least 1.27 Earths, it takes 11.2 days to complete one orbit of its star, and is 0.0485 AU from its star. Its discovery was announced in 2016. And it is located about 4.2 light-years (1.3 parsecs, 40 trillion km, or 25 trillion miles) from Earth in the constellation of Centaurus, making it the closest known exoplanet to the Solar System.',
    mass: 'at least 1.27 Earths',
    planetRadius: 'Unknown',
    orbitalRadius: '0.0485 AU',
    orbitalPeriod: '11.2 days',
    discoveryYear: 2016
  },
  {
    type: 'Gas Giant',
    name: 'Epsilon Eridani b',
    description:
      'is a gas giant exoplanet that orbits an unknown-type star approximately 10 light-years away. Its mass is 1.55 Jupiters, it takes 6.9 years to complete one orbit of its star, and is 3.39 AU from its star. Its discovery was announced in 2000.',
    mass: '1.55 Jupiters',
    planetRadius: 'Unknown',
    orbitalRadius: '3.39 AU',
    orbitalPeriod: '6.9 years',
    discoveryYear: 2000
  },
  {
    type: 'Super Earth',
    name: 'Ross 128 b',
    description:
      'is a confirmed Earth-sized exoplanet, likely rocky, orbiting within the inner habitable zone of the red dwarf Ross 128, at a distance of about 11 light-years from Earth. It is the nearest exoplanet around a quiet red dwarf, and is considered one of the best candidates for habitability. The planet is only 35% more massive than Earth, receives only 38% more sunlight, and is expected to be a temperature suitable for liquid water to exist on the surface, if it has an atmosphere. Its mass is at least 1.4 Earths, it takes 9.9 days to complete one orbit of its star, and is 0.0496 AU from its star. Its discovery was announced in 2017.',
    mass: 'at least 1.4 Earths',
    planetRadius: 'Unknown',
    orbitalRadius: '0.0496 AU',
    orbitalPeriod: '9.9 days',
    discoveryYear: 2017
  },
  {
    type: 'Super Earth',
    name: 'tau Ceti g',
    description:
      'is a super Earth exoplanet detected by observing the wobbles in the movement of its parent star tau Ceti, a Sun-like, and unknown-type star. A potentially rocky world, larger than Earth with a mass at least 1.75 Earths, it takes 20 days to complete one orbit of its star, and is 0.133 AU from its star. Its discovery was announced in 2017.',
    mass: 'at least 1.75 Earths',
    planetRadius: 'Unknown',
    orbitalRadius: '0.133 AU',
    orbitalPeriod: '20 days',
    discoveryYear: 2017
  },
  {
    type: 'Super Earth',
    name: 'tau Ceti h',
    description:
      "another one of the four planets orbiting tau Ceti, located just 11.8 light-years away, in the constellation Cetus. It's a super Earth exoplanet with a mass at least 1.83 Earths, it takes 49.4 days to complete one orbit of its star, and is 0.243 AU from its star. Its discovery was announced in 2017.",
    mass: 'at least 1.83 Earths',
    planetRadius: 'Unknown',
    orbitalRadius: '0.243 AU',
    orbitalPeriod: '49.4 days',
    discoveryYear: 2017
  },
  {
    type: 'Super Earth',
    name: 'tau Ceti e',
    description:
      "also a Super Earth type and candidate planet orbiting in the inner edge of the habitable zone of its Sun-like star, tau Ceit. It was detected by statistical analyses of the data of the star's variations in radial velocity that were obtained using HIRES, AAPS, and HARPS. It orbits at a distance of 0.538 AU (between the orbits of Venus and Mercury in the Solar System) with an orbital period of 168 days and has a minimum mass of 3.93 Earth masses. If Tau Ceti e possesses an Earth-like atmosphere, the surface temperature would be around 68 °C (154 °F). Its discovery was announced in 2017.",
    mass: 'at least 3.93 Earths',
    planetRadius: 'Unknown',
    orbitalRadius: '0.538 AU',
    orbitalPeriod: '162.9 days',
    discoveryYear: 2017
  },
  {
    type: 'Super Earth',
    name: 'tau Ceti f',
    description:
      "a candidate Super Earth type planet orbiting Tau Ceti in the outer edge of its habitable zone. Few properties of the planet are known other than its orbit and mass. It orbits Tau Ceti at a distance of 1.334 AU (near Mars's orbit in the Solar System) with an orbital period of 642 days and has a minimum mass of 3.93 Earth masses, which means it may be either a super-Earth or terrestrial planet. Reduced Habitability for tau Ceti e and f is due to a massive debris disc around their host that generates intensive bombardment by asteriods and comets. Its discovery was announced in 2017.",
    mass: 'at least 3.93 Earths',
    planetRadius: 'Unknown',
    orbitalRadius: '1.334 AU',
    orbitalPeriod: '1.7 years',
    discoveryYear: 2017
  },
  {
    type: 'Terrestrial',
    name: 'YZ Ceti b',
    description:
      "one of three planets that orbits the M-type star YZ Ceti in the constellation of Cetus. Its mass is at least 0.75 Earths, it takes 2 days to complete one orbit of its star, and is 0.01557 AU from its star. Its orbit was determined to be too close to YZ Ceti to be within the star's habitable zone, with equilibrium temperatures ranging from 347–491 K (74–218 °C; 165–424 °F). Its discovery was announced in 2017.",
    mass: 'at least .75 Earths',
    planetRadius: 'Unknown',
    orbitalRadius: '0.01557 AU',
    orbitalPeriod: '2 days',
    discoveryYear: 2017
  },
  {
    type: 'Terrestrial',
    name: 'YZ Ceti c',
    description:
      "the second planet orbiting YZ Ceti, also too close to it to be within the star's habitable zone, with equilibrium temperatures ranging from 299–423 K (26–150 °C; 79–302 °F). Its mass is at least 0.98 Earths, it takes 3.1 days to complete one orbit of its star, and is 0.0209 AU from its star. Its discovery was announced in 2017.",
    mass: 'at least 0.98 Earths',
    planetRadius: 'Unknown',
    orbitalRadius: '0.0209 AU',
    orbitalPeriod: '3.1 days',
    discoveryYear: 2017
  },
  {
    type: 'Terrestrial',
    name: 'YZ Ceti d',
    description:
      "a super Earth exoplanet and the third one orbiting YZ Ceti. Close in proximity to YZ Ceti to be within the star's habitable zone, with equilibrium temperatures ranging from 260–368 K (−13–95 °C; 8–203 °F). Its mass is at least 1.14 Earths, it takes 4.7 days to complete one orbit of its star, and is 0.02764 AU from its star. Its discovery was announced in 2017.",
    mass: 'at least 1.14 Earths',
    planetRadius: 'Unknown',
    orbitalRadius: '0.02764 AU',
    orbitalPeriod: '4.7 days',
    discoveryYear: 2017
  },
  {
    type: 'Neptune-like',
    name: 'Kapteyn c',
    description:
      "is a Neptune-like exoplanet that orbits a K-type star, a Red dwarf star Kapteyn's Star. Its mass is at least 7 Earths, it takes 121.5 days to complete one orbit of its star, and is 0.311 AU from its star. It is beyond the host star's habitable zone. Its discovery was announced in 2014 and it has been described by its discoverers as a cold Super-Earth. Astronomers believe it's too cold to support liquid water.",
    mass: 'at least 7 Earths',
    planetRadius: 'Unknown',
    orbitalRadius: '0.311 AU',
    orbitalPeriod: '121.5 days',
    discoveryYear: 2014
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])
  const planets = await Promise.all([
    Planet.bulkCreate(planetData, {returning: true})
  ])

  // console.log(`seeded ${users.length} users`)
  console.log(`seeded ${planets.length} planets`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
