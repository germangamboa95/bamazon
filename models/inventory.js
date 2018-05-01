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

            const item_schema = {
                product_name: item.name,
                department_name: item.department, 
                price: item.price, 
                stock_quantity: item.stock,
                product_img_url: item.url,
                product_description: item.description
            }
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO products SET ?", item_schema, (err, results, fields) => {
                if(err) throw err; 
                resolve(results);
            });
        });
    }
    //  Updates item with specified qty 
    updateItemQty(id, qty,isManager) {
        const query = (isManager)? "UPDATE products SET stock_quantity =  stock_quantity + ? WHERE item_id = ?" :
        "UPDATE products SET stock_quantity =  stock_quantity + ? WHERE item_id = ? AND stock_quantity > 0";

        return new Promise( (resolve, reject) => {
            this.connection.query(query, [qty, id], (err, results, fields) => {
                if(err) throw err; 
                const response_m = (results.affectedRows)? 200 : 'Insufficient Product.'
                resolve(response_m)
            });
        });
 
    }

    getLowStock() {
        return new Promise( (resolve, reject) => {
            this.connection.query("SELECT * FROM products WHERE stock_quantity < 5", (err, results, fields) => {
                if(err) throw err; 
                resolve(results);
            });
        });
    }

    getCategories() {
        return new Promise( (resolve, reject) => {
            this.connection.query("SELECT DISTINCT department_name FROM products", (err, results, fields) => {
                if(err) throw err; 
                console.log(results)
                resolve(results);
            });
        });
    }
    


}


module.exports = Inventory; 
