// #!/usr/bin/env node

// import chalk from 'chalk';
// import { mdLinks } from './index.js';
// import {
//   totalUniqueLinks, brokenLink,
// } from './md-links.js';

// const argv = process.argv;

//  Opciones API
// const readOptionsApi = () => {
//   let options = { validate: false };
//   if (argv.length > 3) {
//     if (argv.includes('--validate') || argv.includes('--v')) {
//       options.validate = true;
//     } else {
//       options = {};
//     }
//   }
//   return options;
// };
// // console.log(chalk.magenta('holaaaaaaaaaaaaaaaa'));
// console.log(chalk.dim('holaaaaaaaaaaaaaaaa'));
// console.log(chalk.inverse('holaaaaaaaaaaaaaaaa'));
// console.log(chalk.strikethrough('holaaaaaaaaaaaaaaaa'));
// mdLinks.mdLinks(argv[2], readOptionsApi())
//   .then((res) => {
//     console.log('RESSSS', res);
//     if (argv.includes('--stats') || argv.includes('--s')) {
//       console.table(totalAndUnique(res));
//       if ((argv.includes('--validate') || argv.includes('--v'))) {
//         console.table(broken(res));
//       }
//     } else if (argv.includes('--validate') || argv.includes('--v')) {
//       res.forEach((e) => {
//         console.log((`${e.file} ${e.href} ${e.message} ${e.status} ${e.text}\n`));
//       });
//     } else {
//       res.forEach((e) => {
//         console.log((`${e.file} ${e.href} ${e.text}\n`));
//       });
//     }
//   })
//   .catch((error) => {
//     console.log(chalk.magenta('Ruta no valida', error));
//   });