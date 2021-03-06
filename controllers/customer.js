const inventory = require('../models/inventory.js');
const transaction = require('../models/transactions.js')
const router = require('express').Router()

const products = new inventory();
const buy = new transaction();


router.get('/inventory', (req, res) => {
    products.getInventory()
    .then(result => {
        res.json(JSON.stringify(result))
    });
});

router.get('/inventory/categories',(req, res) => {
    products.getCategories()
    .then(result => {
        res.json(JSON.stringify(result))
    });
}); 


router.get('/inventory/:id', (req, res) => {
    const id = req.params.id;
    products.getItem(id)
    .then(result => {
        res.json(JSON.stringify(result)) 
    });
});

router.post('/purchase/:id/:qty', (req, res) => {
    const id = req.params.id;
    const qty = req.params.qty;
    buy.addTransaction('guest', id)
    .then(res => console.log(res));
    products.updateItemQty(id,qty, false)
    .then(result => {
        
        res.json(JSON.stringify(result));
    });

});





module.exports = router; 