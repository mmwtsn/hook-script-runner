/**
 * Module dependencies
 */

import fs from 'fs'

/**
 * Hook script installer class
 *
 * @class Installer
 * @classdesc Used to install the Runner's hooks directory locally in a project
 */

export default class Installer {
  constructor (path = '../.git') {
    this.symlinked = this._inspect(`${path}/hooks`, 'isSymbolicLink')
    this.saved = this._inspect(`${path}/hooks.save`, 'isDirectory')
  }

  _inspect (path, method) {
    try {
      return Boolean(fs.lstatSync(path)[method]())
    } catch (err) {
      return false
    }
  }
}
