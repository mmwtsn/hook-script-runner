/**
 * Module dependencies.
 */
import fs from 'fs'
import {spawn} from 'child_process'
import hooks from './hooks'

/**
 * Runner class.
 *
 * @class Runner
 * @classdesc Automatically runs a specified hook script once instantiated from
 * within a Git hook script ($GIT_DIR/hooks/<hook-name>). Can be used elsewhere
 */
export default class Runner {
  /**
   * Constructs an instance of Runner.
   *
   * @param {string} hook - Name of hook script.
   * @param {string} [config=../../package.json] - Path to target JSON config.
   * @constructs Runner
   */
  constructor (hook, config = './package.json') {
    this.hook = this._validate(hook)
    this.commands = this._parse(config)
  }

  /**
   * Asynchronously runs this runner's command as a child process.
   *
   * Parent process shares readable and writable stream objects with the child
   * process to preserve child process' STDOUT formatting.
   *
   * For more see {@link
   * https://nodejs.org/api/child_process.html#child_process_options_stdio |
   * child_process options.stdio "inherit"}.
   *
   * @method run
   * @public
   */
  run () {
    const cmd = this.commands

    if (cmd) {
      spawn(cmd[0], cmd[1], {
        stdio: [process.stdin, process.stdout, process.stderr]
      })
    }
  }

  /**
   * Validates whether or not a provided hook is recognized by Git.
   *
   * @method _validate
   * @param {*} hook - Hook name to validate.
   * @throws {Error} Thrown if hook is not recognized by Git.
   * @returns {string} Valid hook name.
   * @protected
   */
  _validate (hook) {
    if (typeof hook === 'undefined') {
      throw new Error('Missing required hook argument')
    }

    if (hooks.indexOf(hook) === -1) {
      throw new Error(`"${hook}" is not valid hook name`)
    }

    return hook
  }

  /**
   * Parses a JSON file for a command or list of commands intended for a given
   * Git hook and returns them in the array in the child_process.spawn() format.
   *
   * @example
   *
   * // JSON config samples with "pre-commit" hook commands
   *
   * const single = {
   *   "hooks": {
   *     "pre-commit": "npm test -s"
   *   }
   * }
   *
   * const double = {
   *   "hooks": {
   *     "pre-commit": [
   *       "npm test -s",
   *       "npm run lint"
   *     ]
   *   }
   * }
   *
   * _parse(single)
   * // => [ "npm", [ "test", "-s" ] ]
   *
   * _parse(double)
   * // => [ [ "npm", [ "test", "-s" ], [ "npm", [ "run", "lint" ] ] ]
   *
   * @method _parse
   * @param {string} config - JSON config file to parse.
   * @returns {string[]} Commands to be parsed to child_process.spawn().
   * @protected
   */
  _parse (config) {
    try {
      const file = fs.readFileSync(config, 'utf8')
      const commands = JSON.parse(file).hooks[this.hook]
      const array = Array.isArray(commands) ? commands : [commands]

      // create a new array of reformatted commands
      return array.map(current => {
        let command = current.split(' ')

        // remove the first string and pass remainder of the array
        return [command.shift(), command]
      })
    } catch (err) {
      return false
    }
  }
}
