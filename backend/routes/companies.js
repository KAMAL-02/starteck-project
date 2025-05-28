import express from 'express';
import { check, validationResult } from 'express-validator';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   POST api/companies
// @desc    Create a company
// @access  Private (founders only)
router.post(
  '/',
  [
    auth,
    authorize('founder'),
    [
      check('name', 'Name is required').not().isEmpty(),
      check('industry', 'Industry is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('stage', 'Stage is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if user already has a company
      const existingCompany = await Company.findOne({ founder: req.user.id });
      
      if (existingCompany) {
        return res.status(400).json({ msg: 'User already has a company' });
      }
      
      const {
        name,
        industry,
        description,
        website,
        logo,
        location,
        stage,
        funding,
        team,
        socialMedia,
        metrics,
        founded,
        companySize,
      } = req.body;

      // Create company
      const companyFields = {
        name,
        founder: req.user.id,
        industry,
        description,
        location,
        stage,
      };

      if (website) companyFields.website = website;
      if (logo) companyFields.logo = logo;
      if (funding) companyFields.funding = funding;
      if (team) companyFields.team = team;
      if (socialMedia) companyFields.socialMedia = socialMedia;
      if (metrics) companyFields.metrics = metrics;
      if (founded) companyFields.founded = founded;
      if (companySize) companyFields.companySize = companySize;

      const company = new Company(companyFields);
      await company.save();

      res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/companies
// @desc    Get all companies
// @access  Public
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find().populate('founder', ['name', 'email']);
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/companies/:id
// @desc    Get company by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('founder', ['name', 'email']);
    
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }

    res.json(company);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/companies/:id
// @desc    Update company
// @access  Private (company founder only)
router.put(
  '/:id',
  [
    auth,
    authorize('founder'),
  ],
  async (req, res) => {
    try {
      let company = await Company.findById(req.params.id);
      
      if (!company) {
        return res.status(404).json({ msg: 'Company not found' });
      }

      // Check user
      if (company.founder.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      const {
        name,
        industry,
        description,
        website,
        logo,
        location,
        stage,
        funding,
        team,
        socialMedia,
        metrics,
        founded,
        companySize,
        isHiring,
      } = req.body;

      // Build company object
      const companyFields = {};
      if (name) companyFields.name = name;
      if (industry) companyFields.industry = industry;
      if (description) companyFields.description = description;
      if (website) companyFields.website = website;
      if (logo) companyFields.logo = logo;
      if (location) companyFields.location = location;
      if (stage) companyFields.stage = stage;
      if (funding) companyFields.funding = funding;
      if (team) companyFields.team = team;
      if (socialMedia) companyFields.socialMedia = socialMedia;
      if (metrics) companyFields.metrics = metrics;
      if (founded) companyFields.founded = founded;
      if (companySize) companyFields.companySize = companySize;
      if (isHiring !== undefined) companyFields.isHiring = isHiring;

      // Update company
      company = await Company.findByIdAndUpdate(
        req.params.id,
        { $set: companyFields },
        { new: true }
      );

      res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/companies/:id
// @desc    Delete company
// @access  Private (company founder only)
router.delete('/:id', auth, authorize('founder'), async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }

    // Check user
    if (company.founder.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Delete all company jobs
    await Job.deleteMany({ company: req.params.id });
    
    // Delete company
    await company.deleteOne();

    res.json({ msg: 'Company deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.status(500).send('Server error');
  }
});

export default router;