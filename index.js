import { transformToAbsolutePath, getFileMd, readFile, getObject } from './md-links.js'

    const mdLinks = (path, options) => new Promise((resolve, reject) => {
        const convertThepath = transformToAbsolutePath(path);
       
    })



// mdLinks().then((resolve) => console.log(resolve));



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