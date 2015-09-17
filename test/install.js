/* global describe, it */

import assert from 'assert'
import Installer from '../src/install'

describe('install', () => {
  it('is a class', done => {
    const installer = new Installer()

    assert.strictEqual(typeof Installer, 'function')
    assert.strictEqual(installer.constructor, Installer)

    done()
  })
})
