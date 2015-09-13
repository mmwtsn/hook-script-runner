/**
 * Module dependencies
 */

import {spawn} from 'child_process'

/**
 * Module exports
 */

export default class Runner {
  run () {
    spawn('npm', ['test', '-s'], {
      stdio: [process.stdin, process.stdout, process.stderr]
    })
  }
}
