const inventory = require('../models/inventory.js')
const router = require('express').Router()

const products = new inventory()




router.get('/inventory', (req, res) => {
    products.getInventory()
    .then(result => {
        res.json(JSON.stringify(result))
    });
});

router.put('/inventory/:id/:qty', (req, res) => {
    const id = req.params.id;
    const qty = req.params.qty;
    products.updateItemQty(id,qty, true)
    .then(result => {
        res.json(JSON.stringify(result));
    });

});

router.post('/inventory/add_item', (req, res) => {
    const item = req.body; 
    console.log(item);
    products.addItem(item)
    .then(result => {
        res.sendStatus(200);
    });
});

router.get('/inventory/get_low_stock', (req, res) => {
  
    products.getLowStock()
    .then(result => {
        res.json(JSON.stringify(result))
    });
});


module.exports = router;