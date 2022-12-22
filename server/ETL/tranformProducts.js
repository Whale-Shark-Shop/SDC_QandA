import { createRequire } from "module";
const require = createRequire(import.meta.url);

var fs = require ('fs');
// var db = require ('./server/index.js');
import { pdb } from '../index.js';
import { printTables, alterTable, showSchema } from './index.js';

// printTables().
//   then(res => {
//     console.log('success');
//   })



let result = [];
let count = 0;
let lengthCheck = [];

showSchema('product');

pdb.query(`
  CREATE TABLE IF NOT EXISTS products (
  product_id BIGSERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price int
  );`);

setTimeout(() => {
  const stream = fs.createReadStream("/Users/calvin/Documents/SDC/SDC Application Data - Atelier Project (_Clean_ Data Set)/product.csv");
  const reader = require("readline").createInterface({ input: stream })

  reader.on('line', function(chunk) {
    //.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)
  let entry = chunk.toString().match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g).filter(el => {
    return el !== '' && el !== ',';
  }).map( el => {
    // el = el.replace(/['"]+/g, '');
    // el = el.replace(/'/g, "\\'");
    if (el.includes('"')) {
      return el.slice(1, el.length - 1)
    }
    return el;
  });
  if (count == 150000 || count == 200000 || count == 50000) {
    // entry.forEach(el => console.log(el));
    console.log('these are the entries',entry);
  }
  // result.push(chunk.split('","'));
  count++;
  if(count > 1 && count <= 1000000) {
  let queryText = 'INSERT INTO products(product_id, name, slogan, description, category, default_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;'
  pdb.query(queryText, entry);

  }
})
}, 2000) ;

setTimeout(() => console.log('this is the count', count), 5000);


// pdb.query(`INSERT INTO products (product_id, name, slogan, description, category, default_price) VALUES (` +
//       `${entry[0]}` + `,` +
//       `'` + `${entry[1]}` + `',` +
//       `'` + `${entry[2]}` + `',` +
//       `'` + `${entry[3]}` + `',` +
//       `'` + `${entry[4]}` + `',` +
//       `'` +`${entry[5]}` + `'` +
//     `)`
//     )
//     .then(result => {
//       // console.log('success')
//       // console.log('this is the result', result);
//     })
//     .catch(err => {
//       console.log(err);
//     })