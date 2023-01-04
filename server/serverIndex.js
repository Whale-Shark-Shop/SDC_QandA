const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(_dirname, './public')));




const port = 3000;
app.listen(port, () => {
  console.log('CRUDdy Todo server is running in the terminal');
  console.log(`To get started, visit: http://localhost:${port}`);
});
