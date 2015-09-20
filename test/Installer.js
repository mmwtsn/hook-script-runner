/* global describe, it */

import assert from 'assert'
import Installer from '../src/Installer'

describe('Installer', () => {
  it('is a class', done => {
    const installer = new Installer()

    assert.strictEqual(typeof Installer, 'function')
    assert.strictEqual(installer.constructor, Installer)

    done()
  })

  describe('#symlinked', () => {
    it('is true when hooks/ is a symlink', done => {
      const installer = new Installer('./test/fixtures/directories/c')

      assert(installer.symlinked)

      done()
    })

    it('is false when hooks/ is not a symlink', done => {
      const installer = new Installer('./test/fixtures/directories/a')

      assert(!installer.symlinked)

      done()
    })
  })

  describe('#saved', () => {
    it('is true when hooks.save/ exists', done => {
      const installer = new Installer('./test/fixtures/directories/c')

      assert(installer.saved)

      done()
    })

    it('is false when hooks.save/ does not', done => {
      const installer = new Installer('./test/fixtures/directories/a')

      assert(!installer.saved)

      done()
    })
  })

  describe('#install', () => {
    it('calls fs.symlinkSync() when not already symlinked')
    it('does not call fs.symlinkSync() when already symlinked')
    it('calls fs.renameSync() when not already saved or symlinked')
    it('does not call fs.renameSync() when already saved or symlinked')
  })
})
