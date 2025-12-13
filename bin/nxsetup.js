#!/usr/bin/env node

const { Command } = require('commander');
const pkg = require('../package.json');
const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

const program = new Command();

program
  .name('nxsetup')
  .description('Nx Monorepo Setup by BecomingParas')
  .version(pkg.version);

program
  .command('clone')
  .description('Clone Nx starter project')
  .option('-b, --branch <branch>', 'Git branch', 'main')
  .action(async ({ branch }) => {
    const git = simpleGit();
    const repo = 'https://github.com/BecomingParas/NX-PROJECT-SETUP.git';

    console.log(`Cloning branch: ${branch}`);
    await git.clone(repo, 'nx-project', ['--branch', branch]);
    console.log('Done.');
  });

program.parse();
