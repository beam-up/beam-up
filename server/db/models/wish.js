const Sequelize = require('sequelize')
const db = require('../db')

const Wish = db.define('wish', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'anonymous'
  },
  // imageUrl: {
  //   type: Sequelize.STRING,
  //   defaultValue:
  //     'https://images-na.ssl-images-amazon.com/images/I/71cM3a2yx6L._SX425_.jpg',
  //   validate: {
  //     isUrl: true
  //   }
  // },
  message: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Wish
