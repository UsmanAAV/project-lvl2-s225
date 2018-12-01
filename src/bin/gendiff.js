#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.2.1')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format', 'stylish')
  .description('Compares two configuration files and shows a difference.')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
