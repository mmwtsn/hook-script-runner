/**
 * Module dependencies
 */

import {spawn} from 'child_process'
import hooks from './hooks'

/**
 * Hook script runner class
 *
 * @class Runner
 * @classdesc Automatically runs a specified hook script once instantiated from
 * within a Git hook script ($GIT_DIR/hooks/<hook-name>). Can be used elsewhere
 */

export default class Runner {
  /**
   * Constructs an instance of Runner
   *
   * @param {string} [hook=pre-commit] - Name of hook script
   * @constructs Runner
   */

  constructor (hook = 'pre-commit') {
    this.hook = this._validate(hook)
  }

  /**
   * Asynchronously runs "npm test -s" when this Runner's hook script is called
   * by Git by spawning a child process
   *
   * Parent process shares readable and writable stream objects with the child
   * process to preserve child process' STDOUT formatting
   *
   * For more see {@link
   * https://nodejs.org/api/child_process.html#child_process_options_stdio |
   * child_process options.stdio "inherit"}
   *
   * @method run
   * @public
   */

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
