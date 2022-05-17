import {transformToAbsolutePath,} from '../src/mdlinks.js'

const routeTest = 'C:\Users\Madelen\LIM017-md-links\documents\file1.md'

describe('transformToAbsolutePath',()=>{
 it('show resolve path in windows', () =>{
   expect(transformToAbsolutePath('documents\file1.md')).toBe(routeTest)
 })
});






describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});
