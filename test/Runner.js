/* global describe, it */

import assert from 'assert'
import child_process from 'child_process'
import sinon from 'sinon'
import Runner from '../src/Runner'

describe('Runner', () => {
  it('is a class', done => {
    const runner = new Runner('update')

    assert.strictEqual(typeof Runner, 'function')
    assert.strictEqual(runner.constructor, Runner)

    done()
  })

  it('throws without a hook', done => {
    assert.throws(() => {
      return new Runner()
    }, /Missing required/)

    done()
  })

  it('throws when hook is not a valid', done => {
    ['precommit', 'pre_commit', 'Commit'].map(hook => {
      assert.throws(() => {
        return new Runner(hook)
      }, /not valid hook name/)
    })

    done()
  })

  describe('#hook', () => {
    it('holds the target hook script name', done => {
      const runner = new Runner('commit-msg')

      assert.strictEqual(runner.hook, 'commit-msg')

      done()
    })
  })

  describe('#run', () => {
    it('calls child_process.spawn once', done => {
      const stub = sinon.stub(child_process, 'spawn')
      const runner = new Runner('update')

      runner.run()
      assert(stub.calledOnce)

      done()
    })
  })
})
