var inquire = require('inquirer')
var prompt = inquire.createPromptModule( )

var mysql = require('mysql')
var config = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})

config.connect(function (e) {
  if (e) throw e
})

config.query('SELECT * FROM products', function (e, r) {
  if (e) throw e
  console.log(r)
})

config.end(function (e) {
  if (e) throw e
})