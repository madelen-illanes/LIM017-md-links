/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-escape */
import fs from 'fs';
// import path, { resolve } from 'path';
import path from 'path';
import MarkdownIt from 'markdown-it';
import fetch from 'node-fetch';

// Verificamos si la ruta es valida
export const validatePath = (route) => fs.existsSync(route);

// Transformo a ruta absoluta
export const transformToAbsolutePath = (route) => {
  if (validatePath && !path.isAbsolute(route)) {
    const isConverted = path.resolve(route).normalize();
    return isConverted;
  }
  return route;
};

// Valida si la ruta es una carpeta
export const folderPath = (route) => fs.lstatSync(route).isDirectory();

// Iterar directorio
export const readDirectory = (route) => fs.readdirSync(route);

// Is file
export const isfile = (route) => fs.lstatSync(route).isFile();

// Función para identificar si es un archivo con extención md
export const identifyFile = (route) => path.extname(route) === '.md';

// lectura de la ruta
export function getFileMd(route) {
  let arrFiles = [];
  if (isfile(route) && identifyFile(route)) {
    arrFiles.push(route);
  } else if (folderPath(route)) {
    const files = readDirectory(route);
    files.forEach((file) => {
      const newRoute = path.join(route, file);
      const reading = getFileMd(newRoute);
      arrFiles = reading.concat(arrFiles);
    });
  }
  return arrFiles;
}

// Convierte archivo md en html
export const renderMdtoHTML = (pathUser) => {
  const md = new MarkdownIt();
  const render = md.render(pathUser);
  return render;
};

// leer archivos y obtener href, text , file
export const readFile = (pathReceived) => {
  const links = [];
  if (identifyFile(pathReceived)) {
    const file = fs.readFileSync(pathReceived, 'utf8');
    const parsedFile = renderMdtoHTML(file);
    const regExp = /(<a [^>]*(href="([^>^\"]*)")[^>]*>)([^<]+)(<\/a>)/gi;
    let result;
    if (!transformToAbsolutePath(pathReceived)) {
      pathReceived = transformToAbsolutePath(pathReceived).replace(/\\/g, '/');
    } else {
      pathReceived = pathReceived.replace(/\\/g, '/');
    }
    while ((result = regExp.exec(parsedFile)) !== null) {
      const obj = {
        href: result[0, 3],
        text: result[0, 4],
        file: pathReceived,
      };
      links.push(obj);
    }
  }
  return links;
};
// console.log(readFile('./documents/file3.md'));
// Extraer la información de cada link que se encuentra en el md
export const getObject = (readFile) => {
  let arrayPromises = [];
  arrayPromises = readFile.map((obj) => fetch(obj.href)
    .then((resolve) => ({
      ...obj,
      status: resolve.status,
      message: resolve.statusText,
      icon: '✔',
    }))
    .catch((error) => ({
      ...obj,
      status: 'Status no Found',
      message: 'Not Found',
      icon: '✖',
    })));
  return Promise.all(arrayPromises);
};
// export const getObject = (linksCollection) => {
//   const arrStatus = linksCollection.map((el) => {
//     const fetchObj = fetch(obj.href)
//       .then((res) => {
//         const msgStatus = res.status >= 200 && res.status <= 299 ? 'ok' : 'fail';
//         const objStatus = {
//           href: obj.href,
//           text: obj.text,
//           file: obj.file,
//           status: res.status,
//           ok: msgStatus,
//         };
//         return objStatus;
//       })
//       .catch(() => ({
//         href: obj.href,
//         text: obj.text,
//         file: obj.file,
//         status: 'Fail: Your request failed',
//         ok: 'fail',
//       }));
//     return fetchObj;
//   });
//   return Promise.all(arrStatus);
// };
// getObject(('./documents/file1.md'), { validate: true })
//   .then((resolve) => console.log(resolve))
//   .catch((error) => console.log(error));