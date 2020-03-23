/* eslint linebreak-style: ["error", "windows"] */
/* global db print */
/* eslint no-restricted-globals: "off" */

db.items.remove({});
const count = db.items.count();
print('Inserted ', count, ' records');

db.counters.remove({ _id: 'items' });
db.counters.insert({ _id: 'items', current: count });

db.items.createIndex({ id: 1 }, { unique: true });
db.items.createIndex({ Name: 1 });
db.items.createIndex({ Price: 1 });
db.items.createIndex({ Image: 1 });
