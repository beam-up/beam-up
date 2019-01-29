const router = require('express').Router()
const {Planet} = require('../db/models')
module.exports = router

// get all planets
// localhost:8080/api/planets
router.get('/', async (req, res, next) => {
  try {
    const planets = await Planet.findAll()
    res.json(planets)
  } catch (err) {
    next(err)
  }
})

// get single planet by id
// localhost:8080/api/planets/1
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const planet = await Planet.findById(id)
    res.json(planet)
  } catch (err) {
    next(err)
  }
})
