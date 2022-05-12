module.exports = () => {
  // ...
};

const md = require ('md');
const prueba = md.readFileSync('readme.md', 'utf8');
console.log (`esto es readme:/n`, prueba);