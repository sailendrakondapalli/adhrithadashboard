import express from 'express';
import Team from '../models/Team.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public - Get all teams (leaderboard)
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('evaluatedBy', 'name')
      .sort({ marks: -1, teamName: 1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Public - Get teams by phase
router.get('/phase/:phase', async (req, res) => {
  try {
    const teams = await Team.find({ phase: req.params.phase })
      .populate('evaluatedBy', 'name')
      .sort({ marks: -1, teamName: 1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Teacher only - Create or update team
router.post('/', protect, async (req, res) => {
  try {
    const { teamName, phase, marks, remarks } = req.body;
    
    // Check if team already exists for this phase and room
    const existingTeam = await Team.findOne({
      teamName,
      room: req.teacher.room,
      phase
    });

    if (existingTeam) {
      // Update existing team
      existingTeam.marks = marks;
      existingTeam.remarks = remarks;
      existingTeam.evaluatedBy = req.teacher._id;
      await existingTeam.save();
      
      const updated = await Team.findById(existingTeam._id).populate('evaluatedBy', 'name');
      return res.json(updated);
    }

    // Create new team entry
    const team = await Team.create({
      teamName,
      room: req.teacher.room,
      phase,
      marks,
      remarks,
      evaluatedBy: req.teacher._id
    });

    const populated = await Team.findById(team._id).populate('evaluatedBy', 'name');
    res.status(201).json(populated);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Team already exists for this phase' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Teacher only - Update team
router.put('/:id', protect, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    if (team.room !== req.teacher.room) {
      return res.status(403).json({ message: 'Cannot modify other rooms data' });
    }

    const { marks, remarks } = req.body;
    team.marks = marks !== undefined ? marks : team.marks;
    team.remarks = remarks !== undefined ? remarks : team.remarks;
    
    await team.save();
    const updated = await Team.findById(team._id).populate('evaluatedBy', 'name');
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
