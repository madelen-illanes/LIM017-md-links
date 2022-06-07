/* eslint-disable no-undef */
import fetch from 'node-fetch';
// import MarkdownIt from 'markdown-it';
import {
  transformToAbsolutePath, validatePath, readFile, getObject, getFileMd,
} from '../md-links.js';

jest.mock('node-fetch', () => jest.fn());

const routeTest = 'C:\\Users\\Madelen\\LIM017-md-links\\documents';
const fileTest = './documents/file3.md';
// const routAbsoluteTest = 'C:\\Users\\Madelen\\LIM017-md-links\\documents';
const arrayObject = [
  {
    href: 'https://github.com/markdown-it/markdown-it',
    text: 'markdown-it',
    file: './documents/file3.md',
  },
  {
    href: 'ht://github.com/markdown-it/markdown-it',
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
      file: './documents/file3.md',
      href: 'https://github.com/markdown-it/markdown-it',
      message: 'OK',
      icon: '✔',
      status: 200,
      text: 'markdown-it',
    },
  ];
  it('return array objects', () => getObject(readFile(fileTest))
    .then((resolve) => {
      expect(resolve).toEqual(arrayValidateTest);
    }));
});
