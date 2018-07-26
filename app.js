if ( process.env.NODE_ENV != 'test') {
  process.env.NODE_ENV = 'development';
}

let config = require('./config');
const app = require('express')();
const mysql = require('mysql');
const bodyParser = require('body-parser');
connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : config.dbName[app.settings.env]
});
console.log(config.dbName[app.settings.env]);
let route = require('./routes/books');



app.use(bodyParser.json());
app.use('/books', route);
app.listen(3000, () =>{
  console.log('Sever Listening at port 3000');
});


module.exports = app;
