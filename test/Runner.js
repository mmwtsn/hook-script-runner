/* global describe, it */

import assert from 'assert'
import child_process from 'child_process'
import sinon from 'sinon'
import Runner from '../src/Runner'

const hook = 'pre-commit'
const config = './test/fixtures/config.json'

describe('Runner', () => {
  it('is a class', done => {
    const runner = new Runner(hook, config)

    assert.strictEqual(typeof Runner, 'function')
    assert.strictEqual(runner.constructor, Runner)

    done()
  })

  it('requires a hook', done => {
    assert.throws(() => {
      return new Runner()
    }, /Missing required/)

    done()
  })

  it('validates its hook', done => {
    ['precommit', 'pre_commit', 'Commit'].map(hook => {
      assert.throws(() => {
        return new Runner(hook, config)
      }, /not valid hook name/)
    })

    done()
  })

  it('validates its config when provided', done => {
    assert.throws(() => {
      return new Runner(hook, 'does-not-exist.json')
    }, /no such file/)

    assert.throws(() => {
      return new Runner(hook, './test/Runner.js')
    }, SyntaxError)

    assert.throws(() => {
      return new Runner(hook, './test/fixtures/missing-hook-config.json')
    }, /missing/)

    assert.throws(() => {
      return new Runner(hook, './test/fixtures/missing-hooks-config.json')
    }, /missing/)

    done()
  })

  describe('#hook', () => {
    it('holds the target hook script name', done => {
      const runner = new Runner(hook, config)

      assert.deepEqual(runner.targets, ['npm', ['test', '-s']])

      done()
    })
  })

  describe('#targets', () => {
    it('hold the parsed target hook script executables', done => {
      const runner = new Runner(hook, config)

      assert.strictEqual(runner.hook, hook)

      done()
    })
  })

  describe('#run', () => {
    it('calls child_process.spawn once', done => {
      const stub = sinon.stub(child_process, 'spawn')
      const runner = new Runner(hook, config)

      runner.run()
      assert(stub.calledOnce)

      done()
    })
  })
})
