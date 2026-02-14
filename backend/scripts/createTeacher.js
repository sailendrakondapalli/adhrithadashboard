import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Teacher from '../models/Teacher.js';

dotenv.config();

const createTeachers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Create sample teachers
    const teachers = [
      { name: 'Teacher 1', email: 'teacher1@roomA.com', password: 'password123', room: 'Room A' },
      { name: 'Teacher 2', email: 'teacher2@roomA.com', password: 'password123', room: 'Room A' },
      { name: 'Teacher 3', email: 'teacher1@roomB.com', password: 'password123', room: 'Room B' },
      { name: 'Teacher 4', email: 'teacher2@roomB.com', password: 'password123', room: 'Room B' },
    ];

    for (const teacher of teachers) {
      const exists = await Teacher.findOne({ email: teacher.email });
      if (!exists) {
        const hashedPassword = await bcrypt.hash(teacher.password, 10);
        await Teacher.create({ ...teacher, password: hashedPassword });
        console.log(`✅ Created: ${teacher.email}`);
      } else {
        console.log(`⚠️  Already exists: ${teacher.email}`);
      }
    }

    console.log('\n🎉 Teachers created successfully!');
    console.log('\nLogin credentials:');
    console.log('Email: teacher1@roomA.com | Password: password123 | Room: Room A');
    console.log('Email: teacher2@roomA.com | Password: password123 | Room: Room A');
    console.log('Email: teacher1@roomB.com | Password: password123 | Room: Room B');
    console.log('Email: teacher2@roomB.com | Password: password123 | Room: Room B');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createTeachers();
