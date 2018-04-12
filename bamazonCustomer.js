var inq = require('inquirer')
var pmpt = inq.createPromptModule( )

var mysql = require('mysql')
var config = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})

function open ( ) {
  config.connect(function (e) {
    if (e) throw e
  })
}

function close ( ) {
  config.end(function (e) {
    if (e) throw e
  })
}

var buy = [
  {
    type: 'input',
    name: 'whichId',
    message: 'What is the id of the product you would like to purchase?',
  },
  {
    type: 'input',
    name: 'quantity',
    message: 'How many of the item would you like to purchase?'
  }
]

open ( )
config.query('SELECT * FROM products', function (e, r) {
  if (e) throw e
  for( var i = 0; i < r.length; i++ ){
    for(var key in r[i]) {
      console.log(key + ' : ' + r[i][key])
    }
  }
})
close ( )

// function start ( ) {
//   prompt(q1).then(function (r) {
//     switch (r.x) {
//       case 'Create an item' :
//         nextQs( )
//         break
//       case 'View all items' : 
//         returnFunction( )
//         break
//     }
//   })
// }