var inq = require('inquirer')
var prompt = inq.createPromptModule( )

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

var begin = [
  {
    type: 'list',
    name: 'openShop',
    message: 'Press Enter to view shop inventory',
    choices: ['View Inventory', "I'm ready to purchase"]
  }
]

var buy = [
  {
    type: 'input',
    name: 'whichId',
    message: 'What is the item_id of the product you would like to purchase?',
  },
  {
    type: 'input',
    name: 'quantity',
    message: 'How many of the item would you like to purchase?'
  }
]

function start ( ) {
  prompt(begin).then(function (r) {
    switch (r.openShop) {
      case 'View Inventory' :
        showInventory ( )
        break
      case "I'm ready to purchase" :
        purchase ( )
        break
      }
  })
}

function showInventory ( ) {
  open ( )
  config.query('SELECT * FROM products', function (e, r) {
    if (e) throw e
    for( var i = 0; i < r.length; i++ ){
      for(var key in r[i]) {
        console.log(key + ': ' + r[i][key])
      }
    }
  })
  close ( )
}

function purchase ( ) {
  prompt(buy).then(function (r) {
    console.log(r)
  })
}

// function delData(nm, bd) {
//   open( )
//   var qry = `
//   DELETE FROM products
//   SET ?
//   `
//   var values = {
//     name: nm,
//     currentBid: bd
//   }
//   config.query(qry, values, function (e, r) {
//     if (e) throw e
//   })
//   close( )
// }

start ( )
