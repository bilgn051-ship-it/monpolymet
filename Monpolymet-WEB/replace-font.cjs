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
    
    // Replace standard CSS imports or variable definitions like 'Montserrat'
    content = content.replace(/'Montserrat'/g, "'Inter Display', 'Inter'");
    
    // Replace inline styles like fontFamily: 'Montserrat, sans-serif'
    content = content.replace(/Montserrat, sans-serif/g, "Inter Display, Inter, sans-serif");
    
    // Replace unquoted Montserrat if it exists anywhere else
    content = content.replace(/Montserrat/g, "Inter Display");
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
