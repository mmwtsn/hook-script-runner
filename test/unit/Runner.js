/* global describe, it */

import assert from 'assert'
import child_process from 'child_process'
import sinon from 'sinon'
import Runner from '../../src/Runner'

const hook = 'pre-commit'
const basePath = './test/fixtures/configs'
const config = `${basePath}/single-command.json`

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

  describe('#hook', () => {
    it('holds the target hook script name', done => {
      const runner = new Runner(hook, config)

      assert.strictEqual(runner.hook, hook)

      done()
    })
  })

  describe('#commands', () => {
    it('can hold a single executable command', done => {
      const runner = new Runner(hook, config)

      const commands = [
        [ 'npm', [ 'test', '-s' ] ]
      ]

      assert.deepEqual(runner.commands, commands)

      done()
    })

    it('can hold multiple executable command', done => {
      const runner = new Runner(hook, `${basePath}/multiple-commands.json`)

      const commands = [
        [ 'npm', [ 'test', '-s' ] ],
        [ 'npm', [ 'run', 'lint:js', '-s' ] ],
        [ 'npm', [ 'run', 'lint:spaces', '-s' ] ]
      ]

      assert.deepEqual(runner.commands, commands)

      done()
    })

    it('is false when package.json cannot be found', done => {
      const runner = new Runner(hook, './does-not-exist.json')

      assert.strictEqual(runner.commands, false)

      done()
    })

    it('is false when hooks key cannot be found', done => {
      const runner = new Runner(hook, `${basePath}/missing-hooks.json`)

      assert.strictEqual(runner.commands, false)

      done()
    })

    it('is false when hooks key is empty', done => {
      const runner = new Runner('update', `${basePath}/empty-hooks.json`)

      assert.strictEqual(runner.commands, false)

      done()
    })
  })

  describe('#run', () => {
    it('calls child_process.spawn once', done => {
      const stub = sinon.stub(child_process, 'spawnSync')
      const runner = new Runner(hook, config)

      runner.run()
      assert(stub.calledOnce)

      done()
    })
  })
})
