import fs from 'fs'
import path, { resolve } from 'path';
import MarkdownIt from 'markdown-it';
import { JSDOM } from 'jsdom';

// Costante que va a guadar la ruta que usuario ingresa en consola
//const pathUser = process.argv[2];
//console.log(process.argv)

// Verificamos si la ruta es valida
export const validatePath = (pathverify) => {
  if (fs.existsSync(pathverify)) {
    return true;
  }
  return false;
};
console.log(validatePath('./documents/file1.md'))

// Transformo a absoluta
export const transformToAbsolutePath = (pathverify) => {
  if (validatePath && !path.isAbsolute(pathverify)){
    const isConverted = path.resolve(pathverify).normalize();
      return isConverted;
  } else {
      return pathverify;
  }
}
console.log(transformToAbsolutePath('./documents/file1.md'))

// Función recursiva verifica si es directorio o archivo
let fileMd=[]
const getFileMd = (pathUser) => {
  if (fs.statSync(pathUser).isDirectory()){
    let directory = pathUser
    fs.readdirSync(pathUser).forEach(file => {
      const routeAbsolute = path.join(directory,file)
      return getFileMd(pathUser=routeAbsolute)
    })
 } else if(fs.statSync(pathUser).isFile()){
      if(path.extname(pathUser) ==='.md'){
        fileMd.push(pathUser)
      }
 } else{
   console.log('unknown path')
 }
 return fileMd;
}
console.log(getFileMd('./documents'))

// Función para identificar si es un archivo md
export const identifyFile = (pathUser) => {
  return path.extname(transformToAbsolutePath(pathUser) === '.md')
};
console.log(path.extname('./documents/file1.md'))

// Función para leer un archivo
export const readTheFile = (pathUser) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathUser, 'utf8', (error, file) => {
      if (error){
        throw error;
      }
      if (!identifyFile(pathUser)){
        reject('Archivo con formato inválido');
      }
      resolve(file);
    });
  });
};



// La ruta es absoluta ?
// export const absolutePath = (pathverify) => {
// return path.isAbsolute(pathverify)
// }
// console.log(path.isAbsolute('./documents/file1.md'))

// export const getPathFiles=(pathRoot)=>{
// const fileNames = fs.readdirSync(pathRoot);
// const arrFiles = fileNames.map(fileName => {
// const filePath = join(pathRoot, fileName);
// const statFile = fs.statSync(filePath);
// return (statFile.isDirectory())? getPathFilesSync(filePath): filePath;
// })
// return arrFiles.flat();
// }