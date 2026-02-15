import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  room: { type: String, required: true },
  phase1Marks: { type: Number, default: 0 },
  phase1Remarks: { type: String, default: '' },
  phase2Marks: { type: Number, default: 0 },
  phase2Remarks: { type: String, default: '' },
  totalMarks: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  createdAt: { type: Date, default: Date.now }
});

// Compound index to ensure one team per room
teamSchema.index({ teamName: 1, room: 1 }, { unique: true });

// Auto-calculate total marks before saving
teamSchema.pre('save', function(next) {
  this.totalMarks = this.phase1Marks + this.phase2Marks;
  next();
});

export default mongoose.model('Team', teamSchema);
