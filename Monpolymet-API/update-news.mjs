import mongoose from 'mongoose';

async function run() {
  const conn = await mongoose.createConnection('mongodb://127.0.0.1:27017/monpolymet').asPromise();
  const News = conn.model('News', new mongoose.Schema({}, { strict: false }), 'newsarticles');

  const r2 = await News.updateOne(
    { _id: new mongoose.Types.ObjectId('6a5a3ce08967650a3be9d599') },
    { $set: { imageUrl: 'http://localhost:4000/uploads/second_news_hero.jpg' } }
  );
  console.log('Update 2 (Second News Photo):', r2);

  await conn.close();
}

run().catch(console.error);
