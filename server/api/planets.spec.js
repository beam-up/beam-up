/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Planet = db.model('planet')

// dummy data for testing
const planetData = [
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
  }
]

describe('Planet routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/planets/', () => {
    let planets

    beforeEach(async () => {
      const createdPlanets = await Planet.bulkCreate(planetData)
      planets = createdPlanets.map(planet => planet.dataValues)
    })

    // get all planets
    it('GET /api/planets', async () => {
      const res = await request(app)
        .get('/api/planets')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
      expect(res.body[0].name).to.be.equal('tau Ceti h')
    })

    // get single planet by id
    it('GET /api/planets/:id', async () => {
      const res = await request(app)
        .get(`/api/planets/2`)
        .expect(200)

      expect(res.body.name).to.be.equal('tau Ceti e')
    })
  }) // end describe('/api/planets')
}) // end describe('Planet routes')
