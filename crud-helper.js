// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
const Item = require('./models/item');
const Category = require('./models/category');
const Purchase = require('./models/purchase');

// Local variables will come in handy for holding retrieved documents
let user, item, category, purchase;
let users, items, categories, purchases;