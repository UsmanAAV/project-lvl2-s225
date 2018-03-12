#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.1')
  .command('gendiff')
  .arguments('<firstConfig> <seconfConfig>')
  .option('-V, --version', 'Output the version number')
  .option('-f, --format [type]', 'Output format')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);
