/**
 * Module dependencies
 */

import fs from 'fs'
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
   * @param {string} hook - Name of hook script
   * @param {string} [config=../../package.json] - Path to target JSON config
   * @constructs Runner
   */

  constructor (hook, config = '../../package.json') {
    this.hook = this._validate(hook)
    this.targets = this._parse(config)
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
    if (typeof hook === 'undefined') {
      throw new Error('Missing required hook argument')
    }

    if (hooks.indexOf(hook) === -1) {
      throw new Error(`"${hook}" is not valid hook name`)
    }

    return hook
  }

  /**
   * Parses default or provided JSON config for hooks
   *
   * @method _parse
   * @param {string} config - JSON config file to parse
   * @throws {MissingConfigError} Thrown if config file does not exist
   * @throws {SyntaxError} Thrown if config is not valid JSON
   * @throws {MalformedConfigError} Thrown if config is malformed
   * @returns {string[]} Commands to be parsed to child_process.spawn()
   * @protected
   */

  _parse (config) {
    const file = fs.readFileSync(config, 'utf8')
    const parsed = JSON.parse(file)

    return parsed.hooks[this.hook]
  }
}
