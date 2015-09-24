/**
 * Module dependencies.
 */
import fs from 'fs'

/**
 * Installer class.
 *
 * @class Installer
 * @classdesc Used to install the Runner's hooks directory locally in a project.
 */
export default class Installer {
  /**
   * Constructs an instance of Installer.
   *
   * @param {string} [path=../../package.json] - Path to $GIT_DIR.
   * @constructs Installer
   */
  constructor (path = '../.git') {
    this.symlinked = this._inspect(`${path}/hooks`, 'isSymbolicLink')
    this.saved = this._inspect(`${path}/hooks.save`, 'isDirectory')
  }

  /**
   * Installs hook runner by symlinking your local $GIT_DIR/hooks to ours and
   * backing up your existing $GIT_DIR/hooks directory if it exists.
   *
   * @param {string} [path=../lib/hooks] - Path to new hooks directory.
   */
  install (path = '../../.git/hooks') {
    if (!this.saved) {
      fs.renameSync(path, `${path}.save`)
    }

    if (!this.symlinked) {
      fs.symlinkSync('../bin/hooks', path, 'dir')
    }
  }

  /**
   * Returns installation state of provided $GIT_DIR.
   *
   * Internally constructs a call to `fs.lstat()` with the provided path and
   * inspects the file stats with by calling the provided method on the returned
   * stats object. For the full list of available methods see {@link
   * https://nodejs.org/api/fs.html#fs_class_fs_stats}.
   *
   * @method _inspect
   * @param {string} path - Relative path to $GIT_DIR.
   * @param {string} method - Method called on fs.Stats object.
   * @returns {Boolean} Result of requested check.
   * @protected
   */
  _inspect (path, method) {
    try {
      return Boolean(fs.lstatSync(path)[method]())
    } catch (err) {
      return false
    }
  }
}
