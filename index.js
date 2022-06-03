/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import {
  transformToAbsolutePath, readFile, getObject, getFileMd,
} from './md-links.js';

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  const verifyPath = transformToAbsolutePath(path);
  if (verifyPath) {
    const arrayFileMd = getFileMd(verifyPath);
    if (arrayFileMd.length) {
      const verifyFile = readFile(arrayFileMd);
      if (verifyFile.length) {
        options.validate ? resolve(getObject(verifyFile)) : resolve(verifyFile);
      } else {
        reject(new Error('No links found'));
      }
    } else {
      reject(new Error('No .md files to analyze'));
    }
  } else { reject(new Error('The path no exists')); }
});

// const mdLinks = (path, options) => new Promise((resolve, reject) => {
//   const convertThepath = transformToAbsolutePath(path); // Función que convierte ruta en absoluta
//   let arra
//   const arrayFileMd = getFileMd(convertThepath); // Si es archivo md
//   // console.log('arrayFileMd', arrayFileMd);
//   getObject(arrayFileMd)
//     .then((res) => {
//       if (options.validate !== true) {
//         resolve(readFile(convertThepath));
//       } else {
//         resolve(getObject(convertThepath));
//       }
//     })
//     .catch((error) => {
//       reject(error);
//     });
// });

// const mdLinks = (path, options) => {
//   const promise = new Promise((resolve, reject) => {
//     if (path) {
//       transformToAbsolutePath(path);
//       let links = [];
//       if (validatePath(path)) {
//         if (folderPath(path)) {
//           links = getObject(path);
//         } else if (isfile(path)) {
//           links = readFile(path);
//         }
//         if (options && options.validate === true) {
//           options.validate ? resolve(getObject(links)) : resolve(links);
//         }
//       } else {
//         reject(new Error('No links found'));
//       }
//     } else {
//       reject(new Error('No .md files to analyze'));
//     }
//   });
//   return promise;[
// };

mdLinks(['./documents'], { validate: true })
  .then((res) => console.log(res))
  .catch((error) => console.log(error));