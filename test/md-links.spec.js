/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// import fetch from 'node-fetch';
// import MarkdownIt from 'markdown-it';
import fetch from 'node-fetch';
import {
  transformToAbsolutePath, validatePath, readFile, getObject, getFileMd,
} from '../md-links.js';

jest.mock('node-fetch', () => jest.fn());
// ({
//   __esModule: true,
//   default: jest.fn(),
// })

const routeTest = 'C:\\Users\\Madelen\\LIM017-md-links\\documents';
const fileTest = './documents/file3.md';
// const routAbsoluteTest = 'C:\\Users\\Madelen\\LIM017-md-links\\documents';
const arrayObject = [
  {
    href: 'https://github.com/markdown-it/markdown-it',
    text: 'markdown-it',
    file: './documents/file3.md',
  },
];

describe('validatePath', () => {
  it('show resolve path', () => {
    expect(typeof validatePath('C:\\Users\\Madelen\\LIM017-md-links\\documents')).toBe('boolean');
  });
});
describe('validatePath', () => {
  it('show resolve path', () => {
    expect(typeof validatePath('C:\\Users\\MadelenLIM017-md-lin')).toBe('boolean');
  });
});

describe('transformToAbsolutePath', () => {
  it('show resolve path in windows', () => {
    expect(transformToAbsolutePath('./documents')).toEqual(routeTest);
  });
});

describe('transformToAbsolutePath', () => {
  it('show resolve path in windows', () => {
    expect(transformToAbsolutePath(routeTest)).toEqual(routeTest);
  });
});
// Lectura de ruta
describe('getFileMd', () => {
  it('show resolve array of rutes', () => {
    expect(getFileMd('.\\documents')).toEqual(['documents\\file3.md', 'documents\\file2.md', 'documents\\file1.md']);
  });
  // si el directorio esta vacio =[]
  it('show resolve array of rutes', () => {
    expect(getFileMd('.\\documents2')).toEqual([]);
  });
});

// lectura de archivo
describe('readFile', () => {
  it('show read file and obten href, text, file', () => {
    expect(readFile(fileTest)).toEqual(arrayObject);
  });
});

//  Obtener objeto con fetch
describe('getObject', () => {
  const arrayValidateTest = [
    {
      href: 'https://github.com/markdown-it/markdown-it',
      text: 'markdown-it',
      file: './documents/file3.md',
      status: 200,
      message: 'OK',
      icon: '✔',
    },
  ];
  it('return array objects', () => {
    fetch.mockResolvedValue({ status: 200, statusText: 'OK' });
    return getObject(readFile(fileTest))
      .then((resolve) => {
        expect(resolve).toEqual(arrayValidateTest);
      });
  });
  const linksWitherror = [
    {
      href: 'ht://github.com/markdown-it/markdown-it',
      text: 'markdown-it',
      file: 'C:/Users/Madelen/LIM017-md-links/documents/file3.md',
      status: 'Status no Found',
      message: 'Not Found',
      icon: '✖',
    },
  ];
  it('return array objects status no found', () => getObject(readFile(fileTest))
    .catch((error) => {
      expect(error).toEqual(linksWitherror);
    }));
});
