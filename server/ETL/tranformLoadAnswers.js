import {createRequire} from "module";
const require = createRequire(import.meta.url);

var fs = require('fs');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:5432/mydb');

try {
  await sequelize.authenticate();
  console.log('Connection has successfully been established');
} catch (error) {
  console.error('Unable to connect to the database', error);
}
