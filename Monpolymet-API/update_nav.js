const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/monpolymet').then(() => {
  const SiteSetting = mongoose.model('SiteSetting', new mongoose.Schema({}, {strict: false}), 'sitesettings');
  return SiteSetting.updateOne(
    { 'key': 'site', 'navigation.id': 'csr' },
    { '$set': { 'navigation.$.label.mn': 'Тогтвортой хөгжил' } }
  );
}).then(console.log).catch(console.error).finally(() => process.exit(0));
