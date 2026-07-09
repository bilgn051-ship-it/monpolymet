import mongoose from 'mongoose';

const HR_NAV = { id: 'hr', label: { mn: 'Хүний нөөц', en: 'Human Resources' }, target: 'careers', order: 8, isActive: true };
const PROCUREMENT_NAV = { id: 'procurement', label: { mn: 'Худалдан авалт', en: 'Procurement' }, target: 'procurement', order: 9, isActive: true };

async function addNav() {
  await mongoose.connect('mongodb://localhost:27017/monpolymet');
  const db = mongoose.connection.db;
  
  await db.collection('sitesettings').updateOne(
    { key: 'site' },
    { $push: { navigation: { $each: [HR_NAV, PROCUREMENT_NAV] } } }
  );
  
  console.log('Added menus successfully');
  process.exit(0);
}
addNav();
