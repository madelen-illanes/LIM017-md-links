import {
  transformToAbsolutePath, readFile, getObject,
} from './md-links.js';

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  const convertThepath = transformToAbsolutePath(path); // Función que convierte ruta en absoluta
  // console.log('convertThepath', convertThepath);
  const arrayFileMd = getFileMd(convertThepath); // Si es archivo md
  // console.log('arrayFileMd', arrayFileMd);
  getObject(arrayFileMd)
    .then((res) => {
      if (options.validate !== true) {
        resolve(readFile(convertThepath));
      } else {
        resolve(getObject(convertThepath));
      }
    })
    .catch((error) => {
      reject(error);
    });
});
mdLinks('./documents', { validate: false })
  .then((res) => console.log(res))
  .catch((error) => console.log(error));
console.log('chaooooooo');
