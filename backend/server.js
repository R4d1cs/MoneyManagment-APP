require('dotenv').config()
const express = require('express')
var mysql = require('mysql')
const cors = require('cors')
const app = express()
const port = process.env.PORT

// MIDDLEWARE FUNCION
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME,
    timezone        : 'UTC'
})

// ENDPOINTS

// Login in user
app.post('/loginUser', (req, res) => {
  let table = 'users'
  let field1 = 'name'
  let field2 = 'passwd'
  let value1 = req.body.name
  let value2 = req.body.passwd

  pool.query(`SELECT * FROM ${table} WHERE ${field1}='${value1}' AND ${field2}='${value2}'`, (err, results) => {
    sendResults(err, results, res)
  })
})

// GET number of data in table
app.get('/:table', (req, res) => {
  let table = req.params.table
    pool.query(`SELECT * FROM ${table}`, (err, results) => {
      sendResults(err, results, res)
    })
})

// GET records by field  
app.get('/:table/:field/:op/:value', (req, res) => {
  let table = req.params.table
  let field = req.params.field
  let value = req.params.value
  let op = getOperator(req.params.op)
  
  if (op == ' like ') {
    value = `%${value}%`
  }

  pool.query(`SELECT * FROM ${table} WHERE ${field}${op}'${value}'`, (err, results) => {
    sendResults(err, results, res)
  })
})

// POST new record to table
app.post('/:table', (req, res) => {
  let table = req.params.table

  let values = '"'+ Object.values(req.body).join('","') +'"'
  let fields = Object.keys(req.body).join(',')

  pool.query(`INSERT INTO ${table} (${fields}) VALUES(${values})`, (err, results) => {
    sendResults(err, results, res)
  })
})

// PATCH record in table by field (update)
app.patch('/:table/:field/:op/:value', (req, res) => {
  let table = req.params.table
  let field = req.params.field
  let value = req.params.value
  let op = getOperator(req.params.op)
 
  if (op == ' like '){
    value = `%${value}%`
  }
 
  let values = Object.values(req.body)
  let fields = Object.keys(req.body)
 
  let sql = ''
  for(i=0; i< values.length; i++){
    sql += fields[i] + `='` + values[i] + `'`
    if (i< values.length-1) {
      sql += ','
    }
  }
 
  pool.query(`UPDATE ${table} SET ${sql} WHERE ${field}${op}'${value}'`, (err, results) => {
    sendResults(err, results, res)
  })
})

// DELETE one record by ID
app.delete('/:table/:id', (req, res) => {
  let table = req.params.table
  let id = req.params.id
  
  pool.query(`DELETE FROM ${table} WHERE ID=${id}`, (err, results) => {
    sendResults(err, results, res)
  })
})

// Send results to the client
function sendResults(err, results, res) {
  if (err){
    res.status(500).send(err.sqlMessage)
  } else {
    res.status(200).send(results)
  }
}

// Change operator value
function getOperator(op) {
  switch(op){
    case 'eq': {op = '='; break}
    case 'lt': {op = '<'; break}
    case 'gt': {op = '>'; break}
    case 'lte': {op = '<='; break}
    case 'gte': {op = '>='; break}
    case 'not': {op = '!='; break}
    case 'lk': {op = ' like '; break}
  }
  return op
}


app.listen(port, () => {
  console.log(`Server listening on port ${port}...`)
})
