const Sequelize = require('sequelize')
const db = require('../db')

const Planet = db.define('planet', {
  type: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  habitability: {
    type: Sequelize.TEXT
  },
  mass: {
    type: Sequelize.STRING
  },
  planetRadius: {
    type: Sequelize.STRING
  },
  orbitalRadius: {
    type: Sequelize.STRING
  },
  orbitalPeriod: {
    type: Sequelize.STRING
  },
  discoveryYear: {
    type: Sequelize.INTEGER
  }
})

module.exports = Planet
