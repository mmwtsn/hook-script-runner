/* global describe, it */

import assert from 'assert'
import index from '../lib'

describe('hook script manager', () => {
  describe('index', () => {
    it('exports an object', done => {
      assert(typeof index === 'object')

      done()
    })
  })
})
