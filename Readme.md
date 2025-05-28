# Starteck - Startup Ecosystem Platform

A platform connecting founders, job seekers, and investors in the startup ecosystem.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRY=7d
   ```
4. Run the development server:
   - Frontend only: `npm run dev`
   - Backend only: `npm run server`
   - Both: `npm run dev:full`

## Seed Data

The project includes a seed script to populate the database with dummy data for testing and development.

To seed the database:

```bash
npm run seed
```

This will create:
- 5 users (2 founders, 1 investor, 2 job seekers)
- 2 companies
- 5 jobs
- 2 job applications

### Seed User Credentials

All users have the same password: `password123`

| Email | Role | Description |
|-------|------|-------------|
| founder1@example.com | Founder | CEO of TechNova |
| founder2@example.com | Founder | CEO of GreenEarth Solutions |
| investor@example.com | Investor | Angel investor |
| jobseeker1@example.com | Job Seeker | Full stack developer |
| jobseeker2@example.com | Job Seeker | Data scientist |
