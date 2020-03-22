/* eslint linebreak-style: ["error", "windows"] */

const { MongoClient } = require('mongodb');

const url = process.env.DB_URL || 'mongodb+srv://shubham:sd12345@cluster0-kblzo.mongodb.net/inventory?retryWrites=true&w=majority';
let client = new MongoClient(url, { useNewUrlParser: true });

function testWithCallBacks(callBack) {
  client.connect((connErr) => {
    if (connErr) {
      callBack(connErr);
      return;
    }
    console.log('COnnected to MongoDB');
    const db = client.db();
    const collection = db.collection('items');
    const item = {
      id: 1,
      category: 'Furniture',
      name: 'Sofa',
      price: '$100',
      image: 'image',
    };
    collection.insertOne(item, (insertErr, result) => {
      if (insertErr) {
        client.close();
        callBack(insertErr);
        return;
      }
      console.log('Inserted ID : ', result.insertedId);
      collection.find({ _id: result.insertedId }).toArray((err, docs) => {
        if (err) {
          client.close();
          callBack(err);
          return;
        }
        console.log('Inserted Document : ', docs);
        client.close();
        callBack(err);
      });
    });
  });
}

async function testWithAsync() {
  client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db();
    const collection = db.collection('items');
    const item = {
      id: 2,
      category: 'Furniture',
      name: 'Sofa',
      price: '$100',
      image: 'image',
    };
    const result = await collection.insertOne(item);
    console.log('Result of insert:\n', result.insertedId);
    const docs = await collection.find({ _id: result.insertedId }).toArray();
    console.log('Result of find:\n', docs);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

testWithCallBacks((err) => {
  if (err) {
    console.log(err);
  }
  testWithAsync();
});
