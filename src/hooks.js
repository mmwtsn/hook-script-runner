/**
 * List of all currently hooks recognized by Git v2.5.0.
 *
 * See `git hooks --help` for full documentation.
 *
 * @module src/hooks
 * @type {string[]}
 */
export default [
  'applypatch-msg',
  'pre-applypatch',
  'post-applypatch',
  'pre-commit',
  'prepare-commit-msg',
  'commit-msg',
  'post-commit',
  'pre-rebase',
  'post-checkout',
  'post-merge',
  'pre-push',
  'pre-receive',
  'update',
  'post-receive',
  'post-update',
  'push-to-checkout',
  'pre-auto-gc',
  'post-rewrite'
]
