const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/monpolymet').then(() => {
  const News = mongoose.model('News', new mongoose.Schema({}, {strict: false}), 'news');
  return News.updateMany({'category.mn': 'Нийгмийн хариуцлага'}, {'$set': {'category.mn': 'Тогтвортой хөгжил'}});
}).then(console.log).catch(console.error).finally(() => process.exit(0));
