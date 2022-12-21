import { createRequire } from "module";
const require = createRequire(import.meta.url);

var fs = require ('fs');
// var db = require ('./server/index.js');
import { pdb } from './server/index.js';
import { printTables, alterTable, showSchema } from './server/index.js';

// printTables().
//   then(res => {
//     console.log('success');
//   })



let result = [];
let count = 0;
let lengthCheck = [];

showSchema('product');

setTimeout(() => {

  const stream = fs.createReadStream("./productsSample.csv");
  const reader = require("readline").createInterface({ input: stream })

  reader.on('line', function(chunk) {
    //.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)
  let entry = chunk.toString().match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g).filter(el => {
    // console.log(el)
    return el !== '' && el !== ',';
  }).map( el => {
    el = el.replace(/['"]+/g, '');
    el = el.replace(/'/g, "\\'");
    if (el.includes('"')) {
      return el.slice(1, el.length - 1)
    }
    return el;
  });
  if (count < 8) {
    // entry.forEach(el => console.log(el));
    console.log('these are the entries',entry);
  }
  // result.push(chunk.split('","'));
  result.push(chunk.split(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g));
  count++;
  if(count > 2 && count < 8) {
    // console.log('this is the data to enter', entry);
    // console.log('first', entry[0]);
    // console.log('secon', entry[1]);
    // console.log('third', entry[2]);
    // console.log('4', entry[3]);
    // console.log('5', entry[4]);
    // console.log('price', entry[5]);
    pdb.query(`INSERT INTO product (product_id, name, slogan, description, category, default_price) VALUES (` +
      `${entry[0]}` + `,` +
      `'` + `${entry[1]}` + `',` +
      `'` + `${entry[2]}` + `',` +
      `'` + `${entry[3]}` + `',` +
      `'` + `${entry[4]}` + `',` +
      `'` +`${entry[5]}` + `'` +
    `)`
    )
  }
})
}, 2000) ;




// Reads out whether it's been added.
setTimeout(() => {console.log(count)}, 4000);
setTimeout(() => {console.log('this is the length', lengthCheck)}, 4000);
