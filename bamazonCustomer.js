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
    var amt = r.quantity
    var itemNum = r.whichId
      open ( )
      config.query('SELECT stock_quantity FROM products WHERE item_id="'+itemNum+'"', function (e, res) {
        if (e) throw e
        if (amt > res[0].stock_quantity) {
          console.log('Insufficient quantity!')
          close ( )
        }
        if (amt <= res[0].stock_quantity) {
          console.log('Purchase completed!')
          config.query('SELECT price FROM products WHERE item_id="'+itemNum+'"', function (e, res) {
            console.log("Your Total Cost: " + res[0].price * amt)
          })
          //show customer cost
          config.query('UPDATE products SET stock_quantity=stock_quantity-'+amt+' WHERE item_id="'+itemNum+'"', function (e, res) {
            if (e) throw e
          })
          close ( )
        }
      })
  })
}

start ( )
