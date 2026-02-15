import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true },
  room: { type: String, required: true },
  phase1Marks: { type: Number, default: 0 },
  phase1Remarks: { type: String, default: '' },
  phase2Marks: { type: Number, default: 0 },
  phase2Remarks: { type: String, default: '' },
  totalMarks: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  createdAt: { type: Date, default: Date.now }
});

// Unique index on teamName only (across all rooms)
teamSchema.index({ teamName: 1 }, { unique: true });

// Auto-calculate total marks before saving
teamSchema.pre('save', function(next) {
  this.totalMarks = (this.phase1Marks || 0) + (this.phase2Marks || 0);
  next();
});

// Ensure indexes are created
teamSchema.set('autoIndex', true);

export default mongoose.model('Team', teamSchema);
