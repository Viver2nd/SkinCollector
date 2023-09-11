const Purchase = require('../../models/purchase');
// const Item = require('../../models/item');

module.exports = {
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
};

// A cart is the unpaid order for a user
async function cart(req, res) {
  // A cart is the unpaid order for a user
  const cart = await Purchase.getCart(req.user._id);
  res.json(cart);
}

// Add an item to the cart
async function addToCart(req, res) {

}

// Updates an item's qty in the cart
async function setItemQtyInCart(req, res) {
}

// Update the cart's isPaid property to true
async function checkout(req, res) {

}
