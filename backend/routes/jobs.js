import express from 'express';
import { check, validationResult } from 'express-validator';
import Job from '../models/Job.js';
import Company from '../models/Company.js';
import Application from '../models/Application.js';
import User from '../models/User.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   POST api/jobs
// @desc    Create a job
// @access  Private (founders only)
router.post(
  '/',
  [
    auth,
    authorize('founder'),
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('type', 'Job type is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('experience', 'Experience level is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        title,
        company,
        description,
        requirements,
        responsibilities,
        type,
        location,
        remote,
        salary,
        skills,
        experience,
        education,
        applicationProcess,
        applicationLink,
        expiresAt,
      } = req.body;

      // Check if company exists and user is the founder
      const companyDoc = await Company.findById(company);
      
      if (!companyDoc) {
        return res.status(404).json({ msg: 'Company not found' });
      }
      
      if (companyDoc.founder.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      // Create job
      const newJob = new Job({
        title,
        company,
        postedBy: req.user.id,
        description,
        type,
        location,
        experience,
      });

      if (requirements) newJob.requirements = requirements;
      if (responsibilities) newJob.responsibilities = responsibilities;
      if (remote !== undefined) newJob.remote = remote;
      if (salary) newJob.salary = salary;
      if (skills) newJob.skills = skills;
      if (education) newJob.education = education;
      if (applicationProcess) newJob.applicationProcess = applicationProcess;
      if (applicationLink) newJob.applicationLink = applicationLink;
      if (expiresAt) newJob.expiresAt = expiresAt;

      await newJob.save();

      // Update company's job count and isHiring status
      await Company.findByIdAndUpdate(company, {
        $inc: { jobCount: 1 },
        $set: { isHiring: true },
      });

      res.json(newJob);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, location, type, experience, remote, company } = req.query;
    
    let query = { status: 'Open', isVisible: true };
    
    // Apply filters
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (type) {
      query.type = type;
    }
    
    if (experience) {
      query.experience = experience;
    }
    
    if (remote === 'true') {
      query.remote = true;
    }
    
    if (company) {
      query.company = company;
    }
    
    const jobs = await Job.find(query)
      .populate('company', ['name', 'logo', 'location'])
      .sort({ createdAt: -1 });
      
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company', ['name', 'logo', 'website', 'description', 'location', 'stage'])
      .populate('postedBy', ['name']);
    
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    res.json(job);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/jobs/:id
// @desc    Update job
// @access  Private (job creator only)
router.put('/:id', auth, authorize('founder'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check user
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const {
      title,
      description,
      requirements,
      responsibilities,
      type,
      location,
      remote,
      salary,
      skills,
      experience,
      education,
      applicationProcess,
      applicationLink,
      status,
      expiresAt,
      isVisible,
    } = req.body;

    // Build job object
    const jobFields = {};
    if (title) jobFields.title = title;
    if (description) jobFields.description = description;
    if (requirements) jobFields.requirements = requirements;
    if (responsibilities) jobFields.responsibilities = responsibilities;
    if (type) jobFields.type = type;
    if (location) jobFields.location = location;
    if (remote !== undefined) jobFields.remote = remote;
    if (salary) jobFields.salary = salary;
    if (skills) jobFields.skills = skills;
    if (experience) jobFields.experience = experience;
    if (education) jobFields.education = education;
    if (applicationProcess) jobFields.applicationProcess = applicationProcess;
    if (applicationLink) jobFields.applicationLink = applicationLink;
    if (status) jobFields.status = status;
    if (expiresAt) jobFields.expiresAt = expiresAt;
    if (isVisible !== undefined) jobFields.isVisible = isVisible;

    // Update job
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: jobFields },
      { new: true }
    );

    res.json(updatedJob);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/jobs/:id
// @desc    Delete job
// @access  Private (job creator only)
router.delete('/:id', auth, authorize('founder'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check user
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Delete associated applications
    await Application.deleteMany({ job: req.params.id });
    
    // Delete job
    await job.deleteOne();
    
    // Update company's job count
    await Company.findByIdAndUpdate(job.company, {
      $inc: { jobCount: -1 },
    });

    // If no more jobs, set isHiring to false
    const jobCount = await Job.countDocuments({ company: job.company, status: 'Open' });
    if (jobCount === 0) {
      await Company.findByIdAndUpdate(job.company, {
        $set: { isHiring: false },
      });
    }

    res.json({ msg: 'Job deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/jobs/:id/apply
// @desc    Apply for a job
// @access  Private (job seekers only)
router.post(
  '/:id/apply',
  [
    auth,
    authorize('jobseeker'),
    [
      check('resumeUrl', 'Resume is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const job = await Job.findById(req.params.id);
      
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' });
      }

      // Check if job is open
      if (job.status !== 'Open') {
        return res.status(400).json({ msg: 'This job is no longer accepting applications' });
      }

      // Check if already applied
      const existingApplication = await Application.findOne({
        job: req.params.id,
        applicant: req.user.id,
      });

      if (existingApplication) {
        return res.status(400).json({ msg: 'You have already applied for this job' });
      }

      const { coverLetter, resumeUrl } = req.body;

      // Create application
      const newApplication = new Application({
        job: req.params.id,
        applicant: req.user.id,
        company: job.company,
        resumeUrl,
      });

      if (coverLetter) newApplication.coverLetter = coverLetter;

      await newApplication.save();

      // Update job application count
      await Job.findByIdAndUpdate(req.params.id, {
        $push: { applications: newApplication._id },
        $inc: { applicationCount: 1 },
      });

      // Update user's applied jobs
      await User.findByIdAndUpdate(req.user.id, {
        $push: { 'jobSeekerProfile.appliedJobs': req.params.id },
      });

      res.json(newApplication);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/jobs/:id/applications
// @desc    Get applications for a job
// @access  Private (job creator only)
router.get('/:id/applications', auth, authorize('founder'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Only allow job poster to view applications
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const applications = await Application.find({ job: req.params.id })
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