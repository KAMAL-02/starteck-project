import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    founder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    website: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      enum: ['Idea', 'Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+', 'Profitable'],
      required: true,
    },
    funding: {
      hasFunding: {
        type: Boolean,
        default: false,
      },
      totalRaised: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: 'USD',
      },
      lastRound: {
        type: String,
        enum: ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+', 'Bootstrapped', 'None'],
        default: 'None',
      },
      investors: [
        {
          name: String,
          website: String,
        },
      ],
    },
    team: [
      {
        name: String,
        role: String,
        linkedIn: String,
      },
    ],
    socialMedia: {
      linkedin: String,
      twitter: String,
      facebook: String,
      instagram: String,
    },
    metrics: {
      employees: {
        type: Number,
        default: 1,
      },
      revenue: {
        type: String,
        enum: ['Pre-revenue', '$1-$10K', '$10K-$50K', '$50K-$100K', '$100K-$500K', '$500K-$1M', '$1M-$5M', '$5M+'],
        default: 'Pre-revenue',
      },
      growthRate: String,
    },
    jobCount: {
      type: Number,
      default: 0,
    },
    isHiring: {
      type: Boolean,
      default: false,
    },
    founded: {
      type: Date,
    },
    companySize: {
      type: String,
      enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1001+'],
      default: '1-10',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Virtual for company age
CompanySchema.virtual('age').get(function () {
  if (!this.founded) return 'N/A';
  
  const foundingYear = new Date(this.founded).getFullYear();
  const currentYear = new Date().getFullYear();
  return currentYear - foundingYear;
});

const Company = mongoose.model('Company', CompanySchema);

export default Company;