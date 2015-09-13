/**
 * Module dependencies
 */

import {spawn} from 'child_process'

/**
 * Module exports
 */

export default class Runner {
  constructor (hook) {
    this.hook = hook
  }

  run () {
    spawn('npm', ['test', '-s'], {
      stdio: [process.stdin, process.stdout, process.stderr]
    })
  }
}
