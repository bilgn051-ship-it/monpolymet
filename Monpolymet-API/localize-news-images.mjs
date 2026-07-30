import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

async function downloadAndLocalizeNewsImages() {
  const conn = await mongoose.createConnection('mongodb://127.0.0.1:27017/monpolymet').asPromise();
  const News = conn.model('News', new mongoose.Schema({}, { strict: false }), 'newsarticles');

  const articles = await News.find({});
  const uploadsDir = 'c:\\Users\\USER\\Downloads\\Monpolymet-WEB 1\\Monpolymet-API\\uploads';

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const currentUrl = article.imageUrl;
    
    if (currentUrl && currentUrl.startsWith('http://localhost:4000/uploads/')) {
      console.log(`Article ${i+1} already localized:`, currentUrl);
      continue;
    }

    if (currentUrl) {
      try {
        console.log(`Downloading article ${i+1} image from:`, currentUrl);
        const res = await fetch(currentUrl);
        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          const filename = `news_${article._id}.jpg`;
          const savePath = path.join(uploadsDir, filename);
          fs.writeFileSync(savePath, buffer);
          const localUrl = `http://localhost:4000/uploads/${filename}`;
          await News.updateOne({ _id: article._id }, { $set: { imageUrl: localUrl } });
          console.log(`✅ Article ${i+1} localized to:`, localUrl);
        } else {
          console.warn(`⚠️ Could not fetch image for article ${i+1} (HTTP ${res.status}), keeping current URL`);
        }
      } catch (err) {
        console.warn(`⚠️ Error downloading image for article ${i+1}:`, err.message);
      }
    }
  }

  await conn.close();
}

downloadAndLocalizeNewsImages().catch(console.error);
