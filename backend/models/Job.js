import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [String],
    responsibilities: [String],
    type: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD',
      },
      isVisible: {
        type: Boolean,
        default: true,
      },
    },
    skills: [String],
    experience: {
      type: String,
      enum: ['Entry Level', '1-3 years', '3-5 years', '5+ years', '7+ years', '10+ years'],
      required: true,
    },
    education: {
      type: String,
      enum: ['High School', 'Bachelor\'s', 'Master\'s', 'PhD', 'Not Required'],
      default: 'Not Required',
    },
    applicationProcess: {
      type: String,
      enum: ['External', 'Internal'],
      default: 'Internal',
    },
    applicationLink: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Open', 'Filled', 'Closed'],
      default: 'Open',
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
      },
    ],
    applicationCount: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      default: function() {
        const now = new Date();
        return new Date(now.setMonth(now.getMonth() + 1));
      },
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Virtual for remaining days
JobSchema.virtual('daysRemaining').get(function () {
  const today = new Date();
  const expiry = new Date(this.expiresAt);
  const diffTime = Math.abs(expiry - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
});

const Job = mongoose.model('Job', JobSchema);

export default Job;