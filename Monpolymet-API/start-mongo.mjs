import { spawn, execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const mongodPath = 'C:\\Users\\USER\\mongodb\\mongodb-win32-x86_64-windows-8.0.26\\bin\\mongod.exe';
const dbPath = 'C:\\Users\\USER\\mongodb\\data';
const logPath = 'C:\\Users\\USER\\mongodb\\log\\mongod.log';

async function start() {
  console.log('Checking persistent MongoDB status on port 27017...');

  try {
    const netstat = execSync('netstat -ano | findstr :27017', { encoding: 'utf8' });
    if (netstat && netstat.includes('LISTENING')) {
      console.log('✅ Persistent MongoDB is already running on port 27017 (Data: C:\\Users\\USER\\mongodb\\data)');
      return;
    }
  } catch (e) {
    // Netstat didn't find port 27017 listening, so proceed to start
  }

  if (fs.existsSync(mongodPath)) {
    console.log('Starting persistent MongoDB instance...');
    fs.mkdirSync(dbPath, { recursive: true });
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
    const child = spawn(mongodPath, ['--dbpath', dbPath, '--port', '27017', '--bind_ip', '127.0.0.1', '--logpath', logPath], {
      detached: true,
      stdio: 'ignore'
    });
    child.unref();
    console.log('✅ Persistent MongoDB started successfully on mongodb://127.0.0.1:27017 (Data: C:\\Users\\USER\\mongodb\\data)');
  } else {
    console.error('❌ Could not find persistent MongoDB at:', mongodPath);
  }
  try {
    const srcImage = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\f94766d2-a2a4-45a6-ad2e-f21f81023916\\media__1786527893603.jpg';
    const destPublic = 'c:\\Users\\USER\\Downloads\\Monpolymet-WEB 1\\Monpolymet-WEB\\public\\hero-slide-3.jpg';
    const destAssets = 'c:\\Users\\USER\\Downloads\\Monpolymet-WEB 1\\Monpolymet-WEB\\src\\assets\\hero-slide-3.jpg';
    if (fs.existsSync(srcImage)) {
      fs.copyFileSync(srcImage, destPublic);
      fs.copyFileSync(srcImage, destAssets);
      console.log('✅ Hero slide 3 image copied successfully!');
    }
  } catch (err) {
    console.error('Image copy error:', err);
  }
}

start();
