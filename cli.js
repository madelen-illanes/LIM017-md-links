// #!/usr/bin/env node

// import {mdLinks} from './index.js'
import {
  totalUniqueLinks, brokenLink,
} from './md-links.js';

const argv = process.argv;

// Opciones API
const readOptionsApi = () => {
  let options = { validate: false };
  if (argv.length > 3) {
    if (argv.includes('--validate') || argv.includes('--v')) {
      options.validate = true;
    } else {
      options = {};
    }
  }
  return options;
};
// console.log('holaaaaaaaaaaaaaaaa');
