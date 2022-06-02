/* eslint-disable no-undef */
import fetch from 'node-fetch';
import MarkdownIt from 'markdown-it';
import { transformToAbsolutePath, validatePath } from '../md-links.js';

jest.mock('node-fetch', () => jest.fn());

const routeTest = 'C:\\Users\\Madelen\\LIM017-md-links\\documents';

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
