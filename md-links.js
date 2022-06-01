/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable eol-last */
// eslint-disable-next-line linebreak-style
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */
/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
/* eslint-disable no-cond-assign */
import fs from 'fs';
import path, { resolve } from 'path';
import MarkdownIt from 'markdown-it';
import axios from 'axios';
import fetch from 'node-fetch';
// import { JSDOM } from 'jsdom';
// const pathUser = process.argv[2];

// Verificamos si la ruta es valida
export const validatePath = (route) => fs.existsSync(route);

// Transformo a absoluta
export const transformToAbsolutePath = (route) => {
  if (validatePath && !path.isAbsolute(route)) {
    const isConverted = path.resolve(route).normalize();
    return isConverted;
  }
  return route;
};

// Valida si la ruta es una carpeta
const folderPath = (route) => fs.statSync(route).isDirectory();

// Iterar directorio
const readDirectory = (route) => fs.readdirSync(route, 'utf-8');

// Función para identificar si es un archivo con extención md
export const identifyFile = (route) => {
  const md = path.extname(route);
  return md === '.md';
};

// lectura de la ruta
const fileMd = [];
export const getFileMd = (pathUser) => new Promise((resolve, reject) => {
  if (folderPath(pathUser)) {
    Promise.all(readDirectory(pathUser).map(element => new Promise((resolve, reject) => {
      const joinRoute = path.join(pathUser, element);
      getFileMd(joinRoute);
    })));
  } else if (identifyFile(pathUser)) {
    fileMd.push(pathUser);
  }
  resolve(fileMd);
});
console.log(getFileMd('./documents'));

// Convierte archivo md en html
const renderMdtoHTML = (pathUser) => {
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
console.log(readFile('./documents/file2.md'));

// Extraer la información de cada link que se encuentra en el md
// const getObject = (readFile) => {
//   let arrayPromises = [];
//   arrayPromises = readFile.map((obj) => fetch(obj.href)
//     .then((resolve) => ({
//       ...obj,
//       status: resolve.status,
//       message: resolve.statusText,
//     }))
//     .catch((error) => ({
//       ...obj,
//       status: '404',
//       message: 'Not Found⚠️ ',
//     })));
//   return Promise.all(arrayPromises);
// };
// getObject(readFile('./documents/file2.md')).then((resolve) => console.log(resolve));

export const getObject = (route) => {
  const promises = route.map(element => readFile(element).then((links) => {
    console.log('links', links);
    return Promise.all(
      links.map((object) => {
        console.log('OBJECT.HREF', object.href);
        return axios
          .get(object.href)
          .then((result) =>
          // result.status >= 200 && result.status <= 399 ? "Ok" : "Fail";
            ({
              href: object.href,
              text: object.text,
              file: object.file,
              status: result.status,
              message: 'Ok',
            }))
          .catch((error) => ({
            href: object.href,
            text: object.text,
            file: object.file,
            status: 404,
            message: 'Fail',
          }));
      }),
    );
  }));
  return Promise.all(promises);
};

// Funciòn para el links total y unique
export const totalUniqueLinks = (arraylinks) =>{
  const totalLinks = arraylinks.length;
  const uniqueLinks = new Set(arraylinks.map((element) => element.href));
  const stats = `${('Total:')} ${(totalLinks)}\n${('Unique:')} ${(uniqueLinks.size)}\n`;
  return stats;
};
console.log(totalUniqueLinks(['./documents/file2.md']));

// Funcion para verificar si esta roto el link
export const brokenLink = (arraylinks) => {
  const broken = arraylinks.filter(element => element.message === 'Fail');
  const stats = `${('Broken:')} ${(broken.length)}\n`;
  return stats;
};
console.log(brokenLink(['./documents/file2.md']));