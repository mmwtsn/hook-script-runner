/* global describe, it */

import assert from 'assert'
import index from '../src'

describe('hook script manager', () => {
  describe('index', () => {
    it('exports an object', done => {
      assert(typeof index === 'object')

      done()
    })
  })
})
