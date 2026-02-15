import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const migrateDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Drop the old teams collection to remove old schema
    console.log('Dropping old teams collection...');
    await mongoose.connection.db.dropCollection('teams').catch(() => {
      console.log('Collection does not exist, skipping drop');
    });

    console.log('✅ Migration complete!');
    console.log('The new schema will be created automatically when you add the first team.');
    
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
};

migrateDatabase();
