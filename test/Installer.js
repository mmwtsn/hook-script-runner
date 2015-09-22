/* global afterEach, beforeEach, describe, it */

import assert from 'assert'
import fs from 'fs'
import sinon from 'sinon'
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
    let symlinkSync
    let renameSync

    beforeEach(done => {
      symlinkSync = sinon.stub(fs, 'symlinkSync')
      renameSync = sinon.stub(fs, 'renameSync')

      done()
    })

    afterEach(done => {
      fs.symlinkSync.restore()
      fs.renameSync.restore()

      done()
    })

    it('calls fs.symlinkSync() when not already symlinked', done => {
      const installer = new Installer('./test/fixtures/directories/a')

      installer.install()
      assert(symlinkSync.calledOnce)

      done()
    })

    it('does not call fs.symlinkSync() when already symlinked', done => {
      const installer = new Installer('./test/fixtures/directories/c')

      installer.install()
      assert(!symlinkSync.calledOnce)

      done()
    })

    it('calls fs.renameSync() when not already saved', done => {
      const installer = new Installer('./test/fixtures/directories/a')

      installer.install()
      assert(renameSync.calledOnce)

      done()
    })

    it('does not call fs.renameSync() when already saved', done => {
      const installer = new Installer('./test/fixtures/directories/c')

      installer.install()
      assert(!renameSync.calledOnce)

      done()
    })
  })
})
