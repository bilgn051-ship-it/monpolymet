import mongoose from 'mongoose';

const DEFAULT_FOOTER_NAV = [
  { id: 'about', label: { mn: 'Бидний тухай', en: 'About us' }, target: 'about', order: 1, isActive: true },
  { id: 'companies', label: { mn: 'Компаниуд', en: 'Companies' }, target: 'companies', order: 2, isActive: true },
  { id: 'csr', label: { mn: 'Нийгмийн хариуцлага', en: 'CSR' }, target: 'csr', order: 3, isActive: true },
  { id: 'hse', label: { mn: 'ЭМААБЦ', en: 'HSE' }, target: 'hse', order: 4, isActive: true },
  { id: 'careers', label: { mn: 'Ажлын байр', en: 'Careers' }, target: 'careers', order: 5, isActive: true },
  { id: 'contact', label: { mn: 'Холбоо барих', en: 'Contact' }, target: 'contact', order: 6, isActive: true }
];

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/monpolymet');
  const db = mongoose.connection.db;
  
  await db.collection('sitesettings').updateOne(
    { key: 'site' },
    { $set: { footerNavigation: DEFAULT_FOOTER_NAV } },
    { upsert: true }
  );
  
  console.log('Seeded footer navigation successfully');
  process.exit(0);
}
seed();
