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
    const child = spawn(mongodPath, ['--dbpath', dbPath, '--port', '27017', '--bind_ip', '127.0.0.1', '--logpath', logPath], {
      detached: true,
      stdio: 'ignore'
    });
    child.unref();
    console.log('✅ Persistent MongoDB started successfully on mongodb://127.0.0.1:27017 (Data: C:\\Users\\USER\\mongodb\\data)');
  } else {
    console.error('❌ Could not find persistent MongoDB at:', mongodPath);
  }
}

start();
