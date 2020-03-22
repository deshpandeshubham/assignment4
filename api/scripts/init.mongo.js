/* eslint linebreak-style: ["error", "windows"] */
/* global db print */
/* eslint no-restricted-globals: "off" */

db.items.remove({});

const itemsDB = [
  {
    id: 1,
    category: 'Furniture',
    name: 'Table',
    price: '$200',
    image: 'img1',
  },
  {
    id: 2,
    category: 'Furniture',
    name: 'Chair',
    price: '$200',
    image: 'img2',
  },
  {
    id: 3,
    category: 'Clothing',
    name: 'Jeans',
    price: '$200',
    image: 'img3',
  },
  {
    id: 4,
    category: 'Clothing',
    name: 'Shirts',
    price: '$200',
    image: 'img4',
  },
];

db.items.insertMany(itemsDB);
const count = db.items.count();
print('Inserted ', count, ' records');

db.counters.remove({ _id: 'items' });
db.counters.insert({ _id: 'items', current: count });

db.items.createIndex({ id: 1 }, { unique: true });
db.items.createIndex({ Category: 1 });
db.items.createIndex({ Name: 1 });
db.items.createIndex({ Image: 1 });

print(db.items.find({}));
