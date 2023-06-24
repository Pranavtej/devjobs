const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());

let Job;
let User;
let CompanyDetails;

async function connectToDB() {
  const USER = process.env.DB_USER;
  const PASS = process.env.DB_PASS;
  const DB_NAME = "devjobs";
  const URI = `mongodb+srv://pranavteja:${PASS}@cluster0.3hxlkya.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

  await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Job schema
  const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    salary: Number,
    role: String,
    skills: [String],
    applicants: [String],
    postedtime: String,
    companyid: String,
  });

  // User schema
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    jobsApplied: [String],
  });

  // Company schema
  const companySchema = new mongoose.Schema({
    name: String,
    RecruiterName: String,
    email: String,
    password: String,
    location: String,
    jobsPosted: [String],
  });

  Job = mongoose.model('jobs', jobSchema);
  User = mongoose.model('users', userSchema);
  CompanyDetails = mongoose.model('CompanyDetails', companySchema);
}

app.get('/', (req, res) => {
  res.send('DevJobs API');
});

// Create a new user
app.post('/api/createAccount', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login user
app.post('/loginUser', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await User.findOne({ email });
    if (userDetails) {
      const isMatch = bcrypt.compareSync(password, userDetails.password);
      if (isMatch) {
        res.send(userDetails);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new company
app.post('/createCompany', async (req, res) => {
  try {
    const { name, companyName, email, password, location } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newCompany = new CompanyDetails({
      name: companyName,
      RecruiterName: name,
      email,
      password: hashedPassword,
      location,
    });
    const savedCompany = await newCompany.save();
    res.send(savedCompany);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login company
app.post('/loginCompany', async (req, res) => {
  try {
    const { email, password } = req.body;
    const companyDetails = await CompanyDetails.findOne({ email });
    if (companyDetails) {
      const isMatch = bcrypt.compareSync(password, companyDetails.password);
      if (isMatch) {
        res.send(companyDetails);
      } else {
        res.status(404).json({ error: 'Company not found' });
      }
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new job
app.post('/postJob', async (req, res) => {
  try {
    const { title, company, location, salary, role, skills, companyid } = req.body;
    const newJob = new Job({
      title,
      company,
      location,
      salary,
      role,
      skills,
      postedtime: new Date().toLocaleString(),
      companyid,
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Get all jobs
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a job
app.put('/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, company, location, salary } = req.body;

    const updatedJob = {
      title,
      company,
      location,
      salary,
    };

    const result = await Job.findByIdAndUpdate(id, updatedJob);

    if (!result) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ message: 'Job updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// View job applications
app.get('/viewApplications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (job) {
      const applicantIds = job.applicants;
      const applicants = await User.find({ _id: { $in: applicantIds } });
      res.send(applicants);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a job
app.delete('/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Job.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Apply for a job
app.post('/apply/:userid/:jobid', async (req, res) => {
  try {
    const { userid, jobid } = req.params;
    const job = await Job.findById(jobid);
    if (job) {
      const user = await User.findById(userid);
      if (user) {
        job.applicants.push(userid);
        const savedJob = await job.save();
        res.send(savedJob);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
const port = 8000;
// Connect to the MongoDB database
connectToDB((err) => {
  if (err) throw err
  console.log('Connected to the database.');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

 // Set the port number



module.exports = app;
