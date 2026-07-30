import mongoose from 'mongoose';

async function updateNewsImages() {
  await mongoose.connect('mongodb://127.0.0.1:27017/monpolymet');
  const News = mongoose.model('News', new mongoose.Schema({}, { strict: false }));
  
  const r1 = await News.updateOne(
    { 'title.mn': { $regex: 'Гарамжав' } },
    { $set: { imageUrl: 'http://localhost:4000/uploads/garamjav.png' } }
  );
  console.log('Update Garamjav:', r1);

  const r2 = await News.updateOne(
    { 'title.mn': { $regex: '21 дэх' } },
    { $set: { imageUrl: 'https://monpolymet.mn/wp-content/uploads/2024/11/467316563_1117016913764982_6953976156202560817_n-640x360.jpg' } }
  );
  console.log('Update Top 100:', r2);

  await mongoose.disconnect();
}

updateNewsImages().catch(console.error);
