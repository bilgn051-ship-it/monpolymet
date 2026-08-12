const { MongoMemoryServer } = require('mongodb-memory-server');

async function start() {
  console.log('Starting In-Memory MongoDB Server on port 27017...');
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 27017,
      dbName: 'monpolymet'
    }
  });

  const uri = mongod.getUri();
  console.log(`🚀 MongoDB Server running at ${uri}`);
}

start().catch(err => {
  console.error('Failed to start MongoMemoryServer:', err);
});
