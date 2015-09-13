/* global describe, it */

import assert from 'assert'
import Runner from '../src'

describe('Runner', () => {
  it('is a class', done => {
    const runner = new Runner()

    assert.strictEqual(typeof Runner, 'function')
    assert.strictEqual(runner.constructor, Runner)

    done()
  })
})
