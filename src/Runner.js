/**
 * Module dependencies
 */

import {spawn} from 'child_process'
import hooks from './hooks'

/**
 * Module exports
 */

export default class Runner {
  constructor (hook = 'pre-commit') {
    this.hook = this._validate(hook)
  }

  run () {
    spawn('npm', ['test', '-s'], {
      stdio: [process.stdin, process.stdout, process.stderr]
    })
  }

  /**
   * Validates whether or not a provided hook is recognized by Git
   *
   * @method _validate
   * @param {*} hook - Hook name to validate
   * @throws {InvalidHookError} Thrown if hook is not recognized by Git
   * @returns {string} Valid hook name
   * @protected
   */

  _validate (hook) {
    if (hooks.indexOf(hook) === -1) {
      throw new Error(`"${hook}" is not valid hook name`)
    }

    return hook
  }
}
