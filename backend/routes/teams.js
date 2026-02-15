import express from 'express';
import Team from '../models/Team.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public - Get all teams (leaderboard)
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('createdBy', 'name')
      .sort({ totalMarks: -1, teamName: 1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Teacher only - Create team (just name)
router.post('/', protect, async (req, res) => {
  try {
    const { teamName } = req.body;
    
    // Check if team already exists (case-insensitive)
    const existingTeam = await Team.findOne({ 
      teamName: { $regex: new RegExp(`^${teamName}$`, 'i') }
    });

    if (existingTeam) {
      return res.status(400).json({ 
        message: `Team name already exists as "${existingTeam.teamName}". Please choose a different name.` 
      });
    }

    const team = await Team.create({
      teamName,
      room: req.teacher.room,
      createdBy: req.teacher._id
    });

    const populated = await Team.findById(team._id).populate('createdBy', 'name');
    res.status(201).json(populated);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Team name already exists. Please choose a different name.' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Teacher only - Update Phase 1 marks
router.put('/:id/phase1', protect, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    if (team.room !== req.teacher.room) {
      return res.status(403).json({ message: 'Cannot modify other rooms data' });
    }

    const { marks, remarks } = req.body;
    team.phase1Marks = marks !== undefined ? marks : team.phase1Marks;
    team.phase1Remarks = remarks !== undefined ? remarks : team.phase1Remarks;
    
    await team.save();
    const updated = await Team.findById(team._id).populate('createdBy', 'name');
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Teacher only - Update Phase 2 marks
router.put('/:id/phase2', protect, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    if (team.room !== req.teacher.room) {
      return res.status(403).json({ message: 'Cannot modify other rooms data' });
    }

    const { marks, remarks } = req.body;
    team.phase2Marks = marks !== undefined ? marks : team.phase2Marks;
    team.phase2Remarks = remarks !== undefined ? remarks : team.phase2Remarks;
    
    await team.save();
    const updated = await Team.findById(team._id).populate('createdBy', 'name');
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Teacher only - Delete team
router.delete('/:id', protect, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    if (team.room !== req.teacher.room) {
      return res.status(403).json({ message: 'Cannot delete other rooms teams' });
    }

    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
