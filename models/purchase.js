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
  
  module.exports = mongoose.model('Purchase', purchaseSchema);