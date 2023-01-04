import { createRequire } from "module";
const require = createRequire(import.meta.url);

var fs = require ('fs');
const { Client } = require ('pg');
// import { pdb } from './server/index.js';
import { printTables, alterTable, showSchema } from './index.js';

let count = 0;
let lengthCheck = [];

const url = '/Users/calvin/Documents/SDC/SDC Application Data - Atelier Project (_Clean_ Data Set)/questions.csv'
const config = {
  host: 'localhost',
  database: 'mydb',
  port: 5432
}
const pdb = new Client(config);

const currentTime = new Date().getTime();

pdb.connect().
    then(() => {pdb.query(`
    CREATE TABLE IF NOT EXISTS questions (
    question_id int PRIMARY KEY,
    product_id int,
    question_body varChar(1500),
    question_date timestamp with time zone,
    asker_name varChar(200),
    asker_email varChar(200),
    reported int DEFAULT 0,
    helpful int DEFAULT 0,
    CONSTRAINT fk_product_id
      FOREIGN KEY(product_id)
        REFERENCES products(product_id)
    );`)
  }).
  then(() => {
    let count = 0;

      const stream = fs.createReadStream(url);
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
      count++;
      if(count > 1000000 && count < 3500000) {
        entry[3] = new Date(Number(entry[3]))
        let queryText = 'INSERT INTO questions(question_id, product_id, question_body, question_date, asker_name, asker_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);'
        pdb.query(queryText, entry);
      }
    })
  }).
  then(result => {
    const finishTime = new Date().getTime();
    console.log(finishTime - currentTime);
  })

