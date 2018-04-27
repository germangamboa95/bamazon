const db = require('../database.js');
var mysql = require("mysql");

class Inventory {
    constructor(){
        this.connection = db; 
    }

    getInventory() {    
        return new Promise( (resolve, rej) => {
            this.connection.connect((err) => {
                if (err) throw err;
                return this.connection.query("SELECT * FROM products", function(err, res) {
                    if (err) throw err;
                    connection.end();
                    resolve(res);
                  });
              });
        });
    }
}

const test = new Inventory();
test.getInventory().then(res => console.log(res));

