/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Planet = db.model('planet')

describe('Planet model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('correctPassword', () => {
    let planet

    beforeEach(async () => {
      planet = await Planet.create({
        type: 'Super Earth',
        name: 'tau Ceti h',
        description:
          "another one of the four planets orbiting tau Ceti, located just 11.8 light-years away, in the constellation Cetus. It's a super Earth exoplanet with a mass at least 1.83 Earths, it takes 49.4 days to complete one orbit of its star, and is 0.243 AU from its star. Its discovery was announced in 2017.",
        mass: 'at least 1.83 Earths',
        planetRadius: 'Unknown',
        orbitalRadius: '0.243 AU',
        orbitalPeriod: '49.4 days',
        discoveryYear: 2017
      })
    })

    it('returns true if the name is correct', () => {
      expect(planet.name).to.be.equal('tau Ceti h')
    })

    it('returns true if the discoveryYear is a number', () => {
      expect(planet.discoveryYear).to.be.a('number')
    })
  }) // end describe('correctPassword')
}) // end describe('Planet model')
