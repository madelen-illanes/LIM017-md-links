#!/usr/bin/env node
/* eslint-disable max-len */

import chalk from 'chalk';
import process from 'node:process';
import { mdLinks } from './index.js';

const [, , ...args] = process.argv;
const routes = args[0];
const validate = args.includes('--validate');
const stats = args.includes('--stats');

if (args.length === 0 && !routes) {
  const help = chalk.bold.whiteBright(`
  _____________________________________________________________________________________
      --validate         => Return link information: href, text, file, status, ok/fail.
      --stats            => Returns the total and unique links.
      --validate --stats => Returns the total, unique and broken links.
  ______________________________________________________________________________________
      `);
  console.error(help);
} else if (args.length === 1 && !validate && !stats) {
  mdLinks(routes, { validate: false })
    .then((result) => {
      result.forEach((res) => console.log(chalk.greenBright(`${('href:')} ${(res.href)}\n${('text:')} ${(res.text)}\n${('file:')} ${(res.file)}\n`))); // href,test,file
    });
} else if (args.length === 2 && validate && !stats) {
  mdLinks(routes, { validate: true })
    .then((result) => {
     // console.log(result);
      result.forEach((res) => console.log(chalk.blueBright(`${('href:')} ${(res.href)}\n${('text:')} ${(res.text)}\n${('file:')} ${(res.file)}\n${('status:')} ${(res.status)}\n${('message:')} ${(res.message)}\n`)));
    })
    .catch(console.error);
} else if (args.length === 2 && !validate && stats) {
  mdLinks(routes, { validate: true })
    .then((result) => {
      const unique = [...new Set(result.map((element) => element.href))].length;
      const total = result.length;
      console.log(chalk.magenta(`${('Total:')} ${(total)}\n${('Unique:')} ${(unique)}`));// Total, Unique
    });
} else if (args.length === 3 && validate && stats) {
  mdLinks(routes, { validate: true })
    .then((result) => {
      const unique = [...new Set(result.map((element) => element.href))].length;
      const total = result.length; const broken = result.filter((element) => element.ok === 'Fail').length;
      console.log(chalk.yellowBright(`${('Total:')} ${(total)}\n${('Unique:')} ${(unique)}\n${('Broken:')} ${(broken)}`)); // Total, Unique, Broken
    })
    .catch(console.error);
}

// console.log(process.argv[0]);
// console.log(chalk.magenta('holaaaaaaaaaaaaaaaa'));
// console.log(chalk.dim('holaaaaaaaaaaaaaaaa'));
// console.log(chalk.inverse('holaaaaaaaaaaaaaaaa'));
// console.log(chalk.strikethrough('holaaaaaaaaaaaaaaaa'));