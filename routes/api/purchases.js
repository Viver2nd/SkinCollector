const express = require('express');
const router = express.Router();
const purchasesCtrl = require('../../controllers/api/purchases');

// GET /api/orders/cart
router.get('/cart', purchasesCtrl.cart);
// POST /api/orders/cart/items/:id
router.post('/cart/items/:id', purchasesCtrl.addToCart);
// POST /api/orders/cart/checkout
router.post('/cart/checkout', purchasesCtrl.checkout);
// POST /api/orders/cart/qty
router.put('/cart/qty', purchasesCtrl.setItemQtyInCart);

module.exports = router;
