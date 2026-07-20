const fs = require('fs');
const path = require('path');

const files = [
  'src/styles/app.css',
  'src/styles/index.css',
  'src/pages/news/NewsDetailPage.jsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Reverse the replacements
    content = content.replace(/'Inter Display', 'Inter'/g, "'Montserrat'");
    content = content.replace(/Inter Display, Inter/g, "Montserrat");
    content = content.replace(/Inter Display/g, "Montserrat");
    
    fs.writeFileSync(filePath, content);
    console.log(`Reverted ${file}`);
  }
});
