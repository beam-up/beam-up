'use strict'
/* global describe beforeEach it */

const seed = require('./seed')

describe('seed script', () => {
  //adds time for seed script to execute
  it('completes successfully', function(done) {
    seed()
    this.timeout(5000)
    setTimeout(done, 3000)
  })
})
