const router = require('express').Router()
const {Wish} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const wish = await Wish.create({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      message: req.body.message
    })
    res.json(wish)
  } catch (err) {
    next(err)
  }
})
