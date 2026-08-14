const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/monpolymet');
  const db = mongoose.connection.db;
  const res = await db.collection('careerspagecontents').updateOne(
    { key: 'careers' },
    { $set: { 'header.imageUrl': '/careers-hero.jpg', 'whyUs.imageUrl': '/hr-bg.jpg', bannerImage: '/hr-bg.jpg' } },
    { upsert: true }
  );
  console.log('✅ Updated DB careerspagecontent:', res);
  await mongoose.disconnect();
}

run().catch(err => console.error(err));
