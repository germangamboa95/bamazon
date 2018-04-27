const db = require('../database.js');
var mysql = require("mysql");

class Inventory {
    constructor(){
        this.connection = db
    }

    //  Gets a list of the current Inventory  and returns it as a promise. 
    getInventory() {    
        return new Promise( (resolve, rej) => {
                return this.connection.query("SELECT * FROM products", function(err, res) {
                    if (err) throw err;
        
                 
                    resolve(res);
                  });

        });
    }
    getItem(id) {
        return new Promise( (resolve, rej) => {
            return this.connection.query("SELECT * FROM products WHERE item_id = ?", id ,function(err, res) {
                if (err) throw err;
             
                resolve(res);
              });

    });

    }

    //  Gets passed an object and adds it to database
    addItem(item) {
            this.connection.query("INSERT INTO products SET ?", item, (err, results, fields) => {
                if(err) throw err; 
            });
    }
    //  Updates item with specified qty 
    updateItemQty(id, qty) {
        return new Promise( (resolve, reject) => {
            this.connection.query("UPDATE products SET stock_quantity =  stock_quantity + ? WHERE item_id = ? AND stock_quantity > 0", [qty, id], (err, results, fields) => {
                if(err) throw err; 
                const response_m = (results.affectedRows)? 200 : 'Insufficient Product.'
                resolve(response_m)
            });
        });
 
    }


}


module.exports = Inventory; 
