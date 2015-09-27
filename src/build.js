/**
 * Module dependencies.
 */
import fs from 'fs'
import hooks from './hooks'

/**
 * Creates internal hook files for each hook in src/hooks.js to call the runner.
 *
 * @param {string} [path=./bin/hooks] - Where the hook scripts will be created.
 */
export default (path = './bin/hooks') => {
  hooks.forEach(hook => {
    let fullPath = `${path}/${hook}`

    fs.writeFile(fullPath, template(hook), err => {
      if (err) throw new Error(err)

      fs.chmod(fullPath, '755', err => {
        if (err) throw new Error(err)
      })
    })
  })
}

/**
 * Builds a hook script template.
 *
 * @param {string} Name - File name of the hook script.
 * @returns {string} A full file-length hook script template.
 */
function template (hook) {
  return `#!/usr/bin/env node

/**
 * This file is part of the Hook Script Runner module.
 *
 * It is symlinked to this location from inside that package. For more,
 * see the README.md file inside your project's node_modules/ directory
 * or on GitHub:
 *
 * https://github.com/mmwtsn/hook-script-runner#readme
 */
var Runner = require('hook-script-runner')

new Runner('${hook}').run()
`
}
