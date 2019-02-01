const router = require('express').Router()
const {Wish} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const wishes = await Wish.findAll()
    res.json(wishes)
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const wish = await Wish.create({
      name: req.body.name,
      message: req.body.message
    })
    res.json(wish)
  } catch (err) {
    next(err)
  }
})
