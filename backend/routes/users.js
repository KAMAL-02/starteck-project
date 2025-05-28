import express from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET api/users
// @desc    Get all users (admin only or limit results)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put(
  '/profile',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      bio,
      phone,
      location,
      social,
      jobSeekerProfile,
      investorProfile,
    } = req.body;

    try {
      // Build profile object
      const userFields = {};
      if (name) userFields.name = name;
      if (bio) userFields.bio = bio;
      if (phone) userFields.phone = phone;
      if (location) userFields.location = location;
      if (social) userFields.social = social;

      // Add role-specific fields
      const user = await User.findById(req.user.id);
      
      if (user.role === 'jobseeker' && jobSeekerProfile) {
        userFields.jobSeekerProfile = {
          ...user.jobSeekerProfile,
          ...jobSeekerProfile,
        };
      }
      
      if (user.role === 'investor' && investorProfile) {
        userFields.investorProfile = {
          ...user.investorProfile,
          ...investorProfile,
        };
      }

      // Update user
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $set: userFields },
        { new: true }
      ).select('-password');

      res.json(updatedUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/users
// @desc    Delete user and profile
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user
    await User.findByIdAndRemove(req.user.id);
    
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;