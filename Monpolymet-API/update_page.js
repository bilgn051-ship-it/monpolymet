const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/monpolymet').then(() => {
  const Page = mongoose.model('Page', new mongoose.Schema({}, {strict: false}), 'pages');
  return Page.updateOne({key: 'csr'}, {'$set': {'navLabel.mn': 'Тогтвортой хөгжил', 'header.title.mn': 'Тогтвортой хөгжил'}});
}).then(console.log).catch(console.error).finally(() => process.exit(0));
