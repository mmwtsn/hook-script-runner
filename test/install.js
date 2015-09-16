/* global describe, it */

import assert from 'assert'
import install from '../src/install'

describe('install', () => {
  it('exports a function', done => {
    assert.strictEqual(typeof install, 'function')

    done()
  })
})
