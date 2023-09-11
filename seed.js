require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Item = require('./models/item');

(async function() {
  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Pistols', sortOrder: 10},
    {name: 'Rifles', sortOrder: 20},
    {name: 'SMGs', sortOrder: 30},
    {name: 'Heavy', sortOrder: 40},
    {name: 'Knives', sortOrder: 50},
    {name: 'Gloves', sortOrder: 60},
  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    {name: 'Glock-18 | Fade', wear: 'Factory New', category: categories[0], price: 1500.00},
    {name: 'AK-47 | Fire Serpent', wear: 'Field Tested', category: categories[1], price: 750.00},
    {name: 'UMP | Fade', wear: 'Factory New', category: categories[2], price: 125.00},
    {name: 'Negev | Mjölnir', wear: 'Factory New', category: categories[3], price: 2000.00},
    {name: '★ Karambit | Tiger Tooth', wear: 'Factory New', category: categories[4], price: 1500.00},
    {name: '★ Driver Gloves | Crimson Weave', wear: 'Field Tested', category: categories[5], price: 250.00},
  ]);

  console.log(items)

  process.exit();
})();