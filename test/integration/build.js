/* global afterEach, beforeEach, describe, it */

import assert from 'assert'
import fs from 'fs'
import rimraf from 'rimraf'
import build from '../../src/build'
import hooks from '../../src/hooks'

describe('build', () => {
  const output = './test/integration/output'

  beforeEach(done => {
    fs.mkdirSync(output)
    build(output)

    done()
  })

  afterEach(done => {
    rimraf(output, err => {
      if (err) throw new Error(err)

      done()
    })
  })

  it('successfully creates the hook scripts', done => {
    const files = fs.readdirSync(output)

    assert.strictEqual(hooks.length, files.length)

    done()
  })
})
