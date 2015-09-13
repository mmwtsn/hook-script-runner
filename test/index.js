/* global describe, it */

import assert from 'assert'
import child_process from 'child_process'
import sinon from 'sinon'
import Runner from '../src'

describe('Runner', () => {
  it('is a class', done => {
    const runner = new Runner()

    assert.strictEqual(typeof Runner, 'function')
    assert.strictEqual(runner.constructor, Runner)

    done()
  })

  describe('#run', () => {
    it('calls child_process.spawn once', done => {
      const stub = sinon.stub(child_process, 'spawn')
      const runner = new Runner()

      runner.run()
      assert(stub.calledOnce)

      done()
    })
  })
})
