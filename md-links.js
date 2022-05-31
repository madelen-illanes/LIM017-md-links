/* eslint-disable eol-last */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line linebreak-style
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */
/* eslint-disable no-useless-escape */
/* eslint-disable no-return-assign */
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
const getObjetsLinks = (route) => readFile(route).then((links) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Promise.all(
    links.map((object) => axios
      .get(object.href)
      .then((result) => ({
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
      }))),
  ));
// console.log(getObjetsLinks('./documents/file2.md'));
