import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Company from './models/Company.js';
import Job from './models/Job.js';
import Application from './models/Application.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Helper function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});
    await Application.deleteMany({});
    
    console.log('Cleared existing data');

    // Create users
    const password = await hashPassword('password123');
    
    const users = await User.insertMany([
      {
        name: 'John Founder',
        email: 'founder1@example.com',
        password,
        role: 'founder',
        location: 'San Francisco, CA',
        bio: 'Serial entrepreneur with 10+ years of experience',
        phone: '123-456-7890',
        social: {
          linkedin: 'https://linkedin.com/in/johnfounder',
          twitter: 'https://twitter.com/johnfounder',
          website: 'https://johnfounder.com'
        }
      },
      {
        name: 'Jane Founder',
        email: 'founder2@example.com',
        password,
        role: 'founder',
        location: 'New York, NY',
        bio: 'Tech enthusiast building the next big thing',
        phone: '123-456-7891',
        social: {
          linkedin: 'https://linkedin.com/in/janefounder',
          twitter: 'https://twitter.com/janefounder',
          website: 'https://janefounder.com'
        }
      },
      {
        name: 'Alex Investor',
        email: 'investor@example.com',
        password,
        role: 'investor',
        location: 'Boston, MA',
        bio: 'Angel investor looking for promising startups',
        phone: '123-456-7892',
        social: {
          linkedin: 'https://linkedin.com/in/alexinvestor',
          twitter: 'https://twitter.com/alexinvestor'
        },
        investorProfile: {
          investmentFocus: ['SaaS', 'Fintech', 'Health Tech'],
          investmentStages: ['Seed', 'Series A'],
          averageTicketSize: {
            min: 50000,
            max: 500000
          },
          portfolio: [
            {
              companyName: 'Previous Startup A',
              investmentDate: new Date('2022-01-15'),
              description: 'AI-driven analytics platform'
            },
            {
              companyName: 'Previous Startup B',
              investmentDate: new Date('2023-04-20'),
              description: 'Fintech payment solution'
            }
          ]
        }
      },
      {
        name: 'Sam Seeker',
        email: 'jobseeker1@example.com',
        password,
        role: 'jobseeker',
        location: 'Austin, TX',
        bio: 'Full stack developer with 5 years of experience',
        phone: '123-456-7893',
        social: {
          linkedin: 'https://linkedin.com/in/samseeker',
          github: 'https://github.com/samseeker'
        },
        jobSeekerProfile: {
          skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
          education: [
            {
              institution: 'University of Texas',
              degree: 'Bachelor of Science',
              fieldOfStudy: 'Computer Science',
              from: new Date('2015-09-01'),
              to: new Date('2019-06-01'),
              current: false,
              description: 'Focused on web development and data structures'
            }
          ],
          experience: [
            {
              company: 'Tech Solutions Inc',
              title: 'Frontend Developer',
              location: 'Austin, TX',
              from: new Date('2019-07-01'),
              to: new Date('2022-12-31'),
              current: false,
              description: 'Developed responsive web applications using React and Redux'
            },
            {
              company: 'Digital Innovations',
              title: 'Full Stack Developer',
              location: 'Austin, TX',
              from: new Date('2023-01-15'),
              to: null,
              current: true,
              description: 'Building scalable web applications with MERN stack'
            }
          ],
          resumeUrl: 'https://example.com/resumes/samseeker.pdf',
          appliedJobs: []
        }
      },
      {
        name: 'Emily Seeker',
        email: 'jobseeker2@example.com',
        password,
        role: 'jobseeker',
        location: 'Seattle, WA',
        bio: 'Data scientist passionate about AI and machine learning',
        phone: '123-456-7894',
        social: {
          linkedin: 'https://linkedin.com/in/emilyseeker',
          github: 'https://github.com/emilyseeker'
        },
        jobSeekerProfile: {
          skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis', 'Machine Learning'],
          education: [
            {
              institution: 'University of Washington',
              degree: 'Master of Science',
              fieldOfStudy: 'Data Science',
              from: new Date('2018-09-01'),
              to: new Date('2020-06-01'),
              current: false,
              description: 'Specialized in machine learning and AI'
            }
          ],
          experience: [
            {
              company: 'Data Insights Corp',
              title: 'Jr. Data Scientist',
              location: 'Seattle, WA',
              from: new Date('2020-07-01'),
              to: new Date('2022-08-31'),
              current: false,
              description: 'Developed predictive models for customer behavior analysis'
            },
            {
              company: 'AI Solutions',
              title: 'Data Scientist',
              location: 'Remote',
              from: new Date('2022-10-01'),
              to: null,
              current: true,
              description: 'Leading machine learning projects for various clients'
            }
          ],
          resumeUrl: 'https://example.com/resumes/emilyseeker.pdf',
          appliedJobs: []
        }
      }
    ]);

    console.log('Created users');

    // Create companies
    const companies = await Company.insertMany([
      {
        name: 'TechNova',
        founder: users[0]._id, // John Founder
        industry: 'SaaS',
        description: 'TechNova is a cutting-edge SaaS platform that helps businesses streamline their operations through AI-powered automation. Our innovative solutions combine machine learning and intuitive design to solve complex business challenges.',
        website: 'https://technova.example.com',
        logo: 'https://via.placeholder.com/150?text=TN',
        location: 'San Francisco, CA',
        stage: 'Series A',
        funding: {
          hasFunding: true,
          totalRaised: 5000000,
          currency: 'USD',
          lastRound: 'Series A',
          investors: [
            { name: 'Venture Partners', website: 'https://venturepartners.com' },
            { name: 'Tech Capital', website: 'https://techcapital.com' }
          ]
        },
        team: [
          { name: 'John Founder', role: 'CEO', linkedIn: 'https://linkedin.com/in/johnfounder' },
          { name: 'Lisa Smith', role: 'CTO', linkedIn: 'https://linkedin.com/in/lisasmith' },
          { name: 'Mark Johnson', role: 'Head of Product', linkedIn: 'https://linkedin.com/in/markjohnson' }
        ],
        socialMedia: {
          linkedin: 'https://linkedin.com/company/technova',
          twitter: 'https://twitter.com/technova'
        },
        metrics: {
          employees: 25,
          revenue: '$500K-$1M',
          growthRate: '150% YoY'
        },
        jobCount: 3,
        isHiring: true,
        founded: new Date('2020-06-15'),
        companySize: '11-50'
      },
      {
        name: 'GreenEarth Solutions',
        founder: users[1]._id, // Jane Founder
        industry: 'CleanTech',
        description: 'GreenEarth Solutions is focused on developing sustainable clean energy technologies to combat climate change. Our innovative solutions include solar energy storage, carbon capture, and energy-efficient building materials.',
        website: 'https://greenearth.example.com',
        logo: 'https://via.placeholder.com/150?text=GE',
        location: 'New York, NY',
        stage: 'Seed',
        funding: {
          hasFunding: true,
          totalRaised: 1500000,
          currency: 'USD',
          lastRound: 'Seed',
          investors: [
            { name: 'Eco Ventures', website: 'https://ecoventures.com' },
            { name: 'Green Future Fund', website: 'https://greenfuturefund.org' }
          ]
        },
        team: [
          { name: 'Jane Founder', role: 'CEO & Founder', linkedIn: 'https://linkedin.com/in/janefounder' },
          { name: 'Robert Green', role: 'CSO', linkedIn: 'https://linkedin.com/in/robertgreen' }
        ],
        socialMedia: {
          linkedin: 'https://linkedin.com/company/greenearth',
          twitter: 'https://twitter.com/greenearth',
          instagram: 'https://instagram.com/greenearth'
        },
        metrics: {
          employees: 12,
          revenue: '$100K-$500K',
          growthRate: '80% YoY'
        },
        jobCount: 2,
        isHiring: true,
        founded: new Date('2021-03-22'),
        companySize: '11-50'
      }
    ]);

    console.log('Created companies');

    // Create jobs
    const jobs = await Job.insertMany([
      {
        title: 'Senior Frontend Developer',
        company: companies[0]._id, // TechNova
        postedBy: users[0]._id, // John Founder
        description: 'We are looking for a Senior Frontend Developer to join our growing team at TechNova. You will be responsible for building and maintaining our user-facing applications and working closely with our design and backend teams.',
        requirements: [
          'At least 5 years of experience with modern JavaScript frameworks (React preferred)',
          'Strong understanding of web fundamentals (HTML, CSS, JavaScript)',
          'Experience with state management solutions like Redux or Context API',
          'Knowledge of modern frontend build tools and workflows',
          'Excellent problem-solving skills and attention to detail'
        ],
        responsibilities: [
          'Develop and maintain user-facing features using React',
          'Collaborate with design team to implement responsive, pixel-perfect UIs',
          'Write clean, maintainable, and efficient code',
          'Optimize applications for maximum speed and scalability',
          'Participate in code reviews and contribute to architecture decisions'
        ],
        type: 'Full-time',
        location: 'San Francisco, CA',
        remote: true,
        salary: {
          min: 120000,
          max: 160000,
          currency: 'USD',
          isVisible: true
        },
        skills: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Redux'],
        experience: '5+ years',
        education: 'Bachelor\'s',
        applicationProcess: 'Internal',
        status: 'Open',
        applicationCount: 0,
        applications: [],
        expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        isVisible: true
      },
      {
        title: 'Full Stack Developer',
        company: companies[0]._id, // TechNova
        postedBy: users[0]._id, // John Founder
        description: 'TechNova is seeking a talented Full Stack Developer to help build and enhance our core SaaS platform. The ideal candidate will have experience with both frontend and backend technologies and a passion for building scalable web applications.',
        requirements: [
          'At least 3 years of experience with full stack development',
          'Proficiency in React for frontend development',
          'Experience with Node.js and Express for backend development',
          'Knowledge of MongoDB or similar NoSQL databases',
          'Understanding of RESTful APIs and WebSockets'
        ],
        responsibilities: [
          'Develop features across the entire stack - frontend, backend, and database',
          'Design and implement scalable, secure, and reusable APIs',
          'Optimize application performance and ensure high-quality user experience',
          'Participate in the full development lifecycle, from planning to deployment',
          'Collaborate with product and design teams to deliver features that meet user needs'
        ],
        type: 'Full-time',
        location: 'San Francisco, CA',
        remote: true,
        salary: {
          min: 100000,
          max: 140000,
          currency: 'USD',
          isVisible: true
        },
        skills: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'TypeScript'],
        experience: '3-5 years',
        education: 'Bachelor\'s',
        applicationProcess: 'Internal',
        status: 'Open',
        applicationCount: 0,
        applications: [],
        expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        isVisible: true
      },
      {
        title: 'DevOps Engineer',
        company: companies[0]._id, // TechNova
        postedBy: users[0]._id, // John Founder
        description: 'Join TechNova as a DevOps Engineer and help us build and maintain our cloud infrastructure. You\'ll be responsible for implementing CI/CD pipelines, managing cloud resources, and ensuring the reliability and scalability of our platform.',
        requirements: [
          'At least 3 years of experience in DevOps or Site Reliability Engineering',
          'Strong knowledge of AWS or similar cloud providers',
          'Experience with containerization technologies like Docker and Kubernetes',
          'Familiarity with CI/CD tools like GitHub Actions, Jenkins, or CircleCI',
          'Understanding of infrastructure as code using tools like Terraform or CloudFormation'
        ],
        responsibilities: [
          'Design, implement, and manage our CI/CD pipelines',
          'Set up and maintain cloud infrastructure on AWS',
          'Monitor system performance and optimize resources for cost-efficiency',
          'Implement security best practices and ensure compliance',
          'Collaborate with development teams to improve deployment processes'
        ],
        type: 'Full-time',
        location: 'San Francisco, CA',
        remote: true,
        salary: {
          min: 110000,
          max: 150000,
          currency: 'USD',
          isVisible: true
        },
        skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'],
        experience: '3-5 years',
        education: 'Bachelor\'s',
        applicationProcess: 'Internal',
        status: 'Open',
        applicationCount: 0,
        applications: [],
        expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        isVisible: true
      },
      {
        title: 'Renewable Energy Engineer',
        company: companies[1]._id, // GreenEarth Solutions
        postedBy: users[1]._id, // Jane Founder
        description: 'GreenEarth Solutions is looking for a talented Renewable Energy Engineer to join our innovative team. You will help design and develop our next-generation solar energy storage solutions and contribute to advancing clean energy technologies.',
        requirements: [
          'Bachelor\'s or Master\'s degree in Electrical Engineering, Energy Systems, or related field',
          'At least 3 years of experience in renewable energy systems, preferably solar',
          'Knowledge of energy storage technologies and battery management systems',
          'Experience with power electronics and electrical system design',
          'Familiarity with energy efficiency standards and regulations'
        ],
        responsibilities: [
          'Design and develop renewable energy systems, focusing on solar energy storage',
          'Conduct feasibility studies and performance analyses for energy projects',
          'Collaborate with the R&D team to improve existing products and develop new solutions',
          'Create technical documentation and specifications for energy systems',
          'Support the testing and validation of prototype systems'
        ],
        type: 'Full-time',
        location: 'New York, NY',
        remote: false,
        salary: {
          min: 90000,
          max: 130000,
          currency: 'USD',
          isVisible: true
        },
        skills: ['Renewable Energy', 'Solar Systems', 'Energy Storage', 'Electrical Engineering', 'System Design'],
        experience: '3-5 years',
        education: 'Bachelor\'s',
        applicationProcess: 'Internal',
        status: 'Open',
        applicationCount: 0,
        applications: [],
        expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        isVisible: true
      },
      {
        title: 'Sustainability Analyst',
        company: companies[1]._id, // GreenEarth Solutions
        postedBy: users[1]._id, // Jane Founder
        description: 'GreenEarth Solutions is seeking a Sustainability Analyst to help us evaluate the environmental impact of our products and develop strategies for continuous improvement. This role will be critical in ensuring our solutions truly fulfill our mission of combating climate change.',
        requirements: [
          'Bachelor\'s degree in Environmental Science, Sustainability, or related field',
          'At least 2 years of experience in sustainability analysis or environmental consulting',
          'Knowledge of life cycle assessment (LCA) methodologies',
          'Familiarity with environmental regulations and certification standards',
          'Strong analytical skills and attention to detail'
        ],
        responsibilities: [
          'Conduct life cycle assessments of our products and technologies',
          'Analyze environmental impacts and identify areas for improvement',
          'Develop sustainability metrics and reporting frameworks',
          'Support certification processes for environmental standards',
          'Collaborate with product teams to integrate sustainability into design processes'
        ],
        type: 'Full-time',
        location: 'New York, NY',
        remote: true,
        salary: {
          min: 70000,
          max: 95000,
          currency: 'USD',
          isVisible: true
        },
        skills: ['Sustainability', 'Environmental Analysis', 'Life Cycle Assessment', 'Carbon Footprint', 'ESG Reporting'],
        experience: '1-3 years',
        education: 'Bachelor\'s',
        applicationProcess: 'Internal',
        status: 'Open',
        applicationCount: 0,
        applications: [],
        expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        isVisible: true
      }
    ]);

    console.log('Created jobs');

    // Create some sample applications
    const applications = await Application.insertMany([
      {
        job: jobs[0]._id, // Senior Frontend Developer at TechNova
        applicant: users[3]._id, // Sam Seeker
        company: companies[0]._id, // TechNova
        coverLetter: 'I am excited to apply for the Senior Frontend Developer position at TechNova. With over 5 years of experience in React and frontend development, I believe I would be a great fit for your team.',
        resumeUrl: 'https://example.com/resumes/samseeker.pdf',
        status: 'Pending',
        notes: ''
      },
      {
        job: jobs[3]._id, // Renewable Energy Engineer at GreenEarth Solutions
        applicant: users[4]._id, // Emily Seeker
        company: companies[1]._id, // GreenEarth Solutions
        coverLetter: 'As someone passionate about sustainable energy solutions, I am very interested in joining the GreenEarth Solutions team as a Renewable Energy Engineer.',
        resumeUrl: 'https://example.com/resumes/emilyseeker.pdf',
        status: 'Reviewed',
        notes: 'Strong background in data science, but limited experience with renewable energy. Consider for interview.'
      }
    ]);

    console.log('Created applications');

    // Update job application counts and arrays
    await Job.findByIdAndUpdate(jobs[0]._id, {
      $push: { applications: applications[0]._id },
      $inc: { applicationCount: 1 }
    });

    await Job.findByIdAndUpdate(jobs[3]._id, {
      $push: { applications: applications[1]._id },
      $inc: { applicationCount: 1 }
    });

    // Update users' applied jobs arrays
    await User.findByIdAndUpdate(users[3]._id, {
      $push: { 'jobSeekerProfile.appliedJobs': jobs[0]._id }
    });

    await User.findByIdAndUpdate(users[4]._id, {
      $push: { 'jobSeekerProfile.appliedJobs': jobs[3]._id }
    });

    console.log('Updated job application counts and user applied jobs');

    console.log('Seed data successfully created!');
    console.log(`
Created:
- ${users.length} users (2 founders, 1 investor, 2 job seekers)
- ${companies.length} companies
- ${jobs.length} jobs
- ${applications.length} job applications
    `);

  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seed function
seedData();
