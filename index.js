/* eslint-disable semi */
/* eslint-disable object-curly-newline */
// eslint-disable-next-line linebreak-style
import { transformToAbsolutePath, getFileMd, readFile, getObject } from './md-links.js'
// eslint-disable-next-line linebreak-style

 const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        const convertThepath = transformToAbsolutePath(path) //Función que convierte ruta en absoluta
        console.log('convertThepath', convertThepath);
        const arrayFileMd = getFileMd(convertThepath) // Si es archivo md
        console.log('arrayFileMd', arrayFileMd);
        getObject(arrayFileMd)
        .then((res) => {
        if (options.validate !== true){
        resolve(readFile(convertThepath));
        } else {
        resolve(getObject(convertThepath));
        }
        })
        .catch((error) => {
        reject(error);
        });
    })
};
//mdLinks().then((resolve) => console.log(resolve));
