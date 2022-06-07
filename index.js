/* eslint-disable prefer-promise-reject-errors */
import {
  transformToAbsolutePath, readFile, getObject,
} from './md-links.js';

export const mdLinks = (path, options = { validate: false }) => new Promise((resolve, reject) => {
  const verifyPath = transformToAbsolutePath(path);
  if (verifyPath === '') {
    reject('path invalid');
  } else {
    const arrayObject = readFile(verifyPath);
    if (arrayObject.length > 0) {
      if (options.validate) {
        resolve(getObject(arrayObject));
      } else {
        resolve(arrayObject);
      }
    } else {
      reject('no links');
    }
  }
});
// mdLinks(('./documents/file3.md'), { validate: false })
//   .then((resolve) => console.log(resolve))
//   .catch((error) => console.log(error));
