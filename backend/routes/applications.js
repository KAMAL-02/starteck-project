import express from 'express';
import { check, validationResult } from 'express-validator';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET api/applications/me
// @desc    Get current user's applications
// @access  Private (job seekers only)
router.get('/me', auth, authorize('jobseeker'), async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', ['title', 'location', 'type', 'company', 'status'])
      .populate('company', ['name', 'logo'])
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/applications/:id
// @desc    Get application by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('job', ['title', 'location', 'type', 'company', 'status'])
      .populate('applicant', ['name', 'email', 'jobSeekerProfile'])
      .populate('company', ['name', 'logo']);

    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    // Check if user is authorized to view this application
    const job = await Job.findById(application.job);
    
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Only allow access to the job poster or the applicant
    if (
      job.postedBy.toString() !== req.user.id &&
      application.applicant._id.toString() !== req.user.id
    ) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(application);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Application not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/applications/:id
// @desc    Update application status
// @access  Private (job creator only)
router.put('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    const job = await Job.findById(application.job);
    
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Only allow job poster to update status
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ msg: 'Status is required' });
    }

    application.status = status;

    await application.save();

    res.json(application);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Application not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/applications/:id
// @desc    Delete application
// @access  Private (applicant only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    // Only allow the applicant to delete their application
    if (application.applicant.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await application.deleteOne();

    // Update job application count
    await Job.findByIdAndUpdate(application.job, {
      $pull: { applications: req.params.id },
      $inc: { applicationCount: -1 },
    });

    // Update user's applied jobs
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { 'jobSeekerProfile.appliedJobs': application.job },
    });

    res.json({ msg: 'Application removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Application not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/applications/job/:jobId
// @desc    Get applications for a specific job
// @access  Private (job creator only)
router.get('/job/:jobId', auth, authorize('founder'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Only allow job poster to view applications
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', ['name', 'email', 'jobSeekerProfile'])
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server error');
  }
});

export default router;
