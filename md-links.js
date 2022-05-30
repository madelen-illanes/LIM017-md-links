/* eslint-disable no-plusplus */
/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-sequences */
/* eslint-disable no-useless-escape */
/* eslint-disable no-return-assign */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-cond-assign */
import fs from 'fs';
import path, { resolve } from 'path';
import MarkdownIt from 'markdown-it';
import axios from 'axios';
import fetch from 'node-fetch';
// import { JSDOM } from 'jsdom';

// Costante que va a guadar la ruta que usuario ingresa en consola
// const pathUser = process.argv[2];
// console.log(process.argv)

// Verificamos si la ruta es valida
export const validatePath = (pathverify) => fs.existsSync(pathverify);
// console.log(validatePath('./documents/file1.md'));

// Transformo a absoluta
export const transformToAbsolutePath = (pathverify) => {
  if (validatePath && !path.isAbsolute(pathverify)) {
    const isConverted = path.resolve(pathverify).normalize();
    return isConverted;
  }
  return pathverify;
};
// console.log(transformToAbsolutePath('./documents/file1.md'));

// Función recursiva verifica si es directorio o archivo
const fileMd = [];
export const getFileMd = (pathUser) => {
  if (fs.statSync(pathUser).isDirectory()) {
    const directory = pathUser;
    fs.readdirSync(pathUser).forEach((file) => {
      const routeAbsolute = path.join(directory, file);
      return getFileMd(pathUser = routeAbsolute);
    });
  } else if (fs.statSync(pathUser).isFile()) {
    if (path.extname(pathUser) === '.md') {
      fileMd.push(pathUser);
    }
  } else {
    console.log('unknown path');
  }
  return fileMd;
};
console.log(getFileMd('./documents'));

// Función para identificar si es un archivo md
export const identifyFile = (pathUser) => {
  const md = path.extname(pathUser);
  return md === '.md';
};
// console.log(identifyFile('./documents/file1.md'));

// Convierte archivo md en html
const renderMdtoHTML = (pathUser) => {
  const md = new MarkdownIt();
  const render = md.render(pathUser);
  return render;
};
// console.log(renderMdtoHTML('./documents/file1.md'));

// Función para leer archivos
export const readFileMd = (pathUser) => fs.readFileSync(pathUser, 'utf8', (err, data) => {
  if (err) throw err;
  return (data);
});
// console.log(readFileMd('./documents/file2.md'));

// valida el Link
export const checkLink = (link, callback) => {
  fetch(link)
    .then(response => {
      /* const obj = {
        href: link.href, //destructuracion para los nombres
        text: link.text,
        file: link.file,
        status: response.status, // status 500
        statusText: response.statusText
      }; */
      const obj = {
        ...link,
        status: response.status,
        statusText: response.statusText,
      };
      callback(obj);
    }).catch(err => { // HAY QUE MANEJAR Q OCURRE CUANDO NO ENTRA Aqui
      console.log(err);
      /* const obj = {
        href: link.href,
        text: link.text,
        file: link.file,
        status: 500,
        statusText: 'FAIL'
      }; */
      const obj = {
        ...link,
        status: 500,
        statusText: 'FAIL',
      };
      callback(obj);
    });
};

export const statusLinks = (links, callback) =>{
  const newLinks = [];
  let j = 0;
  links.forEach(element => {
console.log(checkLink(e, newLink => {newLink}));
    checkLink(element, (newLink) => {
      j++;
      // console.log('j='+j);
      newLinks.push(newLink);
      if (links.length === j) {
        callback(newLinks);
      }
    });
  });
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
