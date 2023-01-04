import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Client } = require ('pg');

const config = {
  host: 'localhost',
  database: 'mydb',
  port: 5432
}

export const pdb = new Client(config);
pdb.connect().
  then(res => {
    console.log('listening on port', 5432);
  }).
  catch(err => {
    console.log(err);
  });

// prints the tables that currently exists
export const printTables = () => {
  return pdb.query("SELECT relname FROM pg_class WHERE relkind = 'r';").
  then(res => { console.log(res); }).
  catch(err => { console.log(err); });
}

export const alterTable = async () => {
  return await pdb.query(`ALTER TABLE product ADD COLUMN description varChar(1500)`);
}


/**
 * Shows the schema for the table that is provided along with the data type
 */
export const showSchema = async (tableName) => {
  pdb.query(`SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_name='${tableName}';`).
    then(res => {
      console.log(res);
    }).
    catch(err => {
      console.log(err);
    });
}

// showSchema('questions');

const questionsSchema = `
  question_id int PRIMARY KEY,
  question_body varChar(1500),
  question_date date,
  asker_name varChar(60),
  question_helpfulness int,
  reported boolean
  `;

/**
 * create table in database provided the name & schema
 */
export const createTable = async (name, schema) => {
  return pdb.query(`CREATE TABLE ${name} (${schema})`).
    then(res => {
      console.log(res);
    }).
    catch(err => {
      console.log(err);
    });
};