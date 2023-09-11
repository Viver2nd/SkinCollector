const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./itemSchema')

const lineItemSchema = new Schema({
    qty: { type: Number, default: 1 },
    item: itemSchema
  }, {
    timestamps: true,
    toJSON: { virtuals: true }
  });

  lineItemSchema.virtual('extPrice').get(function () {
    return this.qty * this.item.price;
  });

const purchaseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lineItems: [lineItemSchema],
    isPaid: { type: Boolean, default: false },
  }, {
    timestamps: true,
    toJSON: { virtuals: true }
  });

  purchaseSchema.virtual('purchaseTotal').get(function () {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
  });
  
  purchaseSchema.virtual('totalQty').get(function () {
    return this.lineItems.reduce((total, item) => total + item.qty, 0);
  });
  
  purchaseSchema.virtual('purchaseId').get(function () {
    return this.id.slice(-6).toUpperCase();
  });

  purchaseSchema.statics.getCart = function(userId) {
    return this.findOneAndUpdate(
      { user: userId, isPaid: false },
      { user: userId },
      { upsert: true, new: true }
    );
  };

// Instance method for adding an item to a cart (unpaid order)
purchaseSchema.methods.addItemToCart = async function (itemId) {
    // 'this' keyword is bound to the cart (order doc)
    const cart = this;
    // Check if the item already exists in the cart
    const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
    if (lineItem) {
      // It already exists, so increase the qty
      lineItem.qty += 1;
    } else {
      // Get the item from the "catalog"
      // Note how the mongoose.model method behaves as a getter when passed one arg vs. two
      const Item = mongoose.model('Item');
      const item = await Item.findById(itemId);
      // The qty of the new lineItem object being pushed in defaults to 1
      cart.lineItems.push({ item });
    }
    // return the save() method's promise
    return cart.save();
  };

// Instance method to set an item's qty in the cart (will add item if does not exist)
purchaseSchema.methods.setItemQty = function(itemId, newQty) {
  // this keyword is bound to the cart (order doc)
  const cart = this;
  // Find the line item in the cart for the menu item
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
  if (lineItem && newQty <= 0) {
    // Calling deleteOne(), removes itself from the cart.lineItems array
    // Note that video shows remove(), which has been removed 😀 in Mongoose v7
    lineItem.deleteOne();
  } else if (lineItem) {
    // Set the new qty - positive value is assured thanks to prev if
    lineItem.qty = newQty;
  }
  // return the save() method's promise
  return cart.save();
};
  
  module.exports = mongoose.model('Purchase', purchaseSchema);