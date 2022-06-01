/* eslint-disable import/named */
/* eslint-disable object-curly-newline */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/extensions
import { transformToAbsolutePath, getFileMd, readFile, getObject } from './md-links.js';

const mdLinks = (path, option) => {
    return new Promise ((resolve, reject) => {
        const convertThepath = transformToAbsolutePath(path) //Función que convierte ruta en absoluta
        console.log('convertThepath', convertThepath);
        const arrayFileMd = getFileMd(convertThepath) // Si es archivo md
        console.log('arrayFileMd', arrayFileMd);
        getObject(arrayFileMd)
        .then((res) => {
        if (option.validate !== true){
        resolve(readFile(convertThepath));
        }else {
        resolve(getObject(convertThepath));
        }
        })
        .catch((error) =>{
        reject (error);
        });
    })
};

//mdLinks().then((resolve) => console.log(resolve));