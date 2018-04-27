const inventory = require('../models/inventory.js')
const router = require('express').Router()

const products = new inventory()

router.get('/inventory', (req, res) => {
    products.getInventory()
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
    products.updateItemQty(id,qty)
    .then(result => {
        res.json(JSON.stringify(result));
    });

});




module.exports = router; 