#!/usr/bin/env node
import program from 'commander';
import genDiff from '../';

program
  .version('0.0.1')
  .arguments('<firstConfig> <seconfConfig>')
  .option('-f, --format [type]', 'Output format')
  .description('Compares two configuration files and shows a difference.')
  .action((firstConfig, seconfConfig) => {
    console.log(genDiff(firstConfig, seconfConfig));
  })
  .parse(process.argv);
