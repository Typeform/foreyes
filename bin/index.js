#! /usr/bin/env node

require('yargs')
  .version(false)
  .commandDir('cmds')
  .demand(1)
  .help()
  .parse()
