import mongoose from 'mongoose';

const DEFAULT_NAV = [
  { id: 'about', label: { mn: 'Бидний тухай', en: 'About us' }, target: 'about', order: 1, isActive: true },
  { id: 'companies', label: { mn: 'Компаниуд', en: 'Companies' }, target: 'companies', order: 2, isActive: true },
  { id: 'csr', label: { mn: 'Нийгмийн хариуцлага', en: 'CSR' }, target: 'csr', order: 3, isActive: true },
  { id: 'news', label: { mn: 'Мэдээлэл', en: 'News' }, target: 'news', order: 4, isActive: true },
  { id: 'tour', label: { mn: '360', en: '360' }, target: 'tour', order: 5, isActive: true },
  { id: 'careers', label: { mn: 'Ажлын байр', en: 'Careers' }, target: 'careers', order: 6, isActive: true },
  { id: 'contact', label: { mn: 'Холбоо барих', en: 'Contact' }, target: 'contact', order: 7, isActive: true }
];

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/monpolymet');
  const db = mongoose.connection.db;
  
  // We need to update the sitesettings collection, document with key 'site'
  await db.collection('sitesettings').updateOne(
    { key: 'site' },
    { $set: { navigation: DEFAULT_NAV } },
    { upsert: true }
  );
  
  console.log('Seeded successfully directly to MongoDB');
  process.exit(0);
}
seed();
