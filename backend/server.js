require('dotenv').config();
const express = require('express');
var mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

// MIDDLEWARE FUNCION
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME,
    timezone: 'UTC'
  });

// ENDPOINTS

// Get number of data in table
app.get('/:table', (req, res)=>{
  let table = req.params.table;

  pool.query(`SELECT * FROM ${table}`, (err, results) => {
    if (err) {
      console.log("backend - error: " + err)
      return
    }
    
    res.send(results)
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
