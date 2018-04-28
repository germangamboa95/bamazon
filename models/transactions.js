const db = require("../database.js");
var mysql = require("mysql");

class Transactions {
  constructor() {
    this.db = db;
  }

  getTransactions() {
    return new Promise((resolve, rej) => {
      return this.db.query("SELECT * FROM transactions", function(
        err,
        res
      ) {
        if (err) throw err;

        resolve(res);
      });
    });
  }

  addTransaction(name, item) {
    const transaction_schema = {
      buyer_name: name,
      item_id: item
    }
    return new Promise((resolve, rej) => {
        return this.db.query("INSERT INTO transactions SET ?",transaction_schema, function(
          err,
          res
        ) {
          if (err) throw err;
  
          resolve(res);
        });
      });

  }


}


module.exports = Transactions;