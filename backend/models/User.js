import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['founder', 'investor', 'jobseeker'],
      required: true,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    // Job seeker specific fields
    jobSeekerProfile: {
      skills: [String],
      education: [
        {
          institution: String,
          degree: String,
          fieldOfStudy: String,
          from: Date,
          to: Date,
          current: Boolean,
          description: String,
        },
      ],
      experience: [
        {
          company: String,
          title: String,
          location: String,
          from: Date,
          to: Date,
          current: Boolean,
          description: String,
        },
      ],
      resumeUrl: String,
      appliedJobs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Job',
        },
      ],
    },
    // Investor specific fields
    investorProfile: {
      investmentFocus: [String],
      investmentStages: [String],
      averageTicketSize: {
        min: Number,
        max: Number,
      },
      portfolio: [
        {
          companyName: String,
          investmentDate: Date,
          description: String,
        },
      ],
    },
    // Social links
    social: {
      linkedin: String,
      twitter: String,
      website: String,
      github: String,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;