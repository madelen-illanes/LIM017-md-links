import {transformToAbsolutePath} from './md-links.js';

const routeTest = 'C:\Users\Madelen\LIM017-md-links\documents\file1.md'

describe('transformToAbsolutePath',()=>{
 it('show resolve path in windows', () =>{
   expect(transformToAbsolutePath('documents\file1.md')).toBe(routeTest);
 })
});



