const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/monpolymet');
  const hash = await bcrypt.hash('Enhee0412@', 10);

  const emails = ['E.Bilguun@monpolymet.mn', 'e.bilguun@monpolymet.mn', 'admin@monpolymet.mn'];

  for (const email of emails) {
    await mongoose.connection.collection('users').updateOne(
      { email: email },
      {
        $set: {
          email: email,
          passwordHash: hash,
          name: 'Билгүүн (Админ)',
          role: 'admin',
          isActive: true
        }
      },
      { upsert: true }
    );
  }

  console.log('All admin email variations updated successfully with password Enhee0412@');
  await mongoose.disconnect();
}

main().catch(console.error);
