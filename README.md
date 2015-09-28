# hook-script-runner

[![wercker status](https://app.wercker.com/status/2c20ed5abd8847ec2455caae4c690aab/s/master "wercker status")](https://app.wercker.com/project/bykey/2c20ed5abd8847ec2455caae4c690aab)

Install once, run everywhere.

## Quick start

Install the Hook Script Runner module in an existing project:

```shell
$ npm install --save-dev hook-script-runner
```

Add some commands to your package.json file:

```
{
  "hooks": {
    "commit-msg": "echo 'What would Tim Pope do?'",
    "pre-commit": [
      "npm test -s",
      "npm run lint -s"
    ]
  }
}
```

These can be anything you want so long as it's executable inside your curent
environment. Each hook name will accept either a string or an array of strings.
If multiple commands are provided they will be run in order.

You can test your setup by either triggering a Git event (e.g. authoring a
commit in the above example) or simply by running them as they're just
executables after all:

```
$ ./.git/hooks/commit-msg
What would Tim Pope do?
```

Good question.

## Disabling hooks

The following hooks can be disabled by passing the `--no-verify` option to
`git commit`:

- commit-msg
- pre-commit

## Additional resources

For a list of all available hooks and a detailed description of each see Git's
documentation [online](http://git-scm.com/docs/githooks) or off: `man githooks`.

For a more in-depth look at the hook system, check out these articles:

- Pro Git

  [Chapter 8.3, Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

- Atlassian Tutorials

  [Git Hooks](https://www.atlassian.com/git/tutorials/git-hooks)

- Digital Ocean Community

  [How To Use Git Hooks To Automate Development and Deployment Tasks](https://www.digitalocean.com/community/tutorials/how-to-use-git-hooks-to-automate-development-and-deployment-tasks)

## Uninstalling

During the installation process your project's local `.git/hooks/` directory is
backed up to `.git/hooks.save/` and symlinked to a directory provided by this
module.

To uninstall:

1. Remove the module:

  ```
  rm -rf node_modules/hook-script-runner
  ```

1. Reset your local Git directory:

  ```
  rm .git/hooks # Delete the symlink
  mv .git/hooks.save .git/hooks # Restore the original hooks directory
  ```

1. Clean up your package.json file if you added anything.

## License

MIT
