import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  room: { type: String, required: true },
  phase: { type: String, required: true, enum: ['Phase 1', 'Phase 2'] },
  marks: { type: Number, required: true, default: 0 },
  remarks: { type: String, default: '' },
  evaluatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  createdAt: { type: Date, default: Date.now }
});

// Compound index to ensure one entry per team per phase per room
teamSchema.index({ teamName: 1, room: 1, phase: 1 }, { unique: true });

export default mongoose.model('Team', teamSchema);
