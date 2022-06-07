/* eslint-disable no-undef */
import {
  mdLinks,
} from '../index.js';

describe('mdLinks', () => {
  const validateFalse = [
    {
      href: 'https://github.com/markdown-it/markdown-it',
      text: 'markdown-it',
      file: 'C:/Users/Madelen/LIM017-md-links/documents/file3.md',
    },
    {
      href: 'ht://github.com/markdown-it/markdown-it',
      text: 'markdown-it',
      file: 'C:/Users/Madelen/LIM017-md-links/documents/file3.md',
    },
  ];
  it('return href,text,file', () => mdLinks('./documents/file3.md', { validate: false })
    .then((resolve) => {
      expect(resolve).toEqual(validateFalse);
    }));
  const validateTrue = [
    {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: 'C:\\Users\\HP\\Documents\\Laboratoria-LIM017\\MD-links\\LIM017-md-links\\sampleDirectory\\directory3\\archive3.md',
      status: 200,
      ok: 'OK',
    },
  ];
  it('return href,text,file,status y ok', () => mdLinks('./documents/file3.md', { validate: true })
    .then((resolve) => {
      expect(resolve).toEqual(validateTrue);
    }));
  it('Return string " no links"', () => mdLinks('./documents')
    .catch((reject) => {
      expect(reject).toBe('no links');
    }));
  it('Debería devolverme un string "the path is invalid"', () => mdLinks('./personalDirectory.md', { validate: true })
    .catch((reject) => {
      expect(reject).toBe('the path is invalid');
    }));
});