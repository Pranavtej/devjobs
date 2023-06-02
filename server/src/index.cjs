const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

app.use(express.json());
app.use(cors());


let Job;
let User;

async function connectToDB(cb) {
  const USER = process.env.DB_USER;
  const PASS = process.env.DB_PASS;
  const DB_NAME = "devjobs";
  const URI = `mongodb+srv://pranavteja:cUSitb0KBaMaZ7ID@cluster0.3hxlkya.mongodb.net/?retryWrites=true&w=majority`;

  await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Job schema
  const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    salary: Number,
    role: String,
    skills: [],
    applicants: [],
    postedtime: String,
    companyid: String,
  });

  // User schema
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    jobsApplied: [],
  });

  //comapny schema
  const companySchema = new mongoose.Schema({
    name: String,
    RecruiterName: String,
    email: String,
    password: String,
    location: String,
    jobsPosted: [],
  });

  // Company = mongoose.model('companies', companySchema);
  ComapanyDetails = mongoose.model('CompanyDetails', companySchema);
  Job = mongoose.model('jobs', jobSchema);
  User = mongoose.model('users', userSchema);
  cb();
}

app.get('/', (req, res) => {
  res.send('DevJobs API');
});

// Create a new user
app.post('/api/createAccount/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    console.log(newUser);
    const savedUser = await newUser.save();
    // res.status(201).json(savedUser);  
    res.send(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

//login user
app.post('/loginUser/:email/:pass', async (req, res) => {
  try {
    
    const email = req.params.email;
    const password = req.params.pass;

    const userDetails = await User.findOne({ email: email});
    console.log(userDetails);
    if (userDetails) {
      const pass = userDetails.password;
      const isMatch = bcrypt.compareSync(password, pass);
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

app.post('/createCompany/:name/:comapanyName/:email/:pass/:location', async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.params.pass, 10);
    const RecruiterName = req.params.name;
    const email = req.params.email;
    const name = req.params.comapanyName;
    const location = req.params.location;
    const newCompany = new ComapanyDetails({
      name,
      RecruiterName,
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

//login company

app.post('/loginCompany/:email/:pass', async (req, res) => {
  try {
    const email = req.params.email;
    const password = req.params.pass;
    const Details = await ComapanyDetails.findOne({ email: email });
    console.log(Details);
    if (Details) {
      const pass = Details.password;
      const isMatch = bcrypt.compareSync(password, pass);
      if (isMatch) {
        console.log(Details);
        res.send(Details);
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
app.post('/PostJob/:title/:company/:location/:salary/:role/:skills/:companyid', async (req, res) => {
  try {
    const { title, company, location, salary, role, skills } = req.params;
    const companyid = req.params.companyid;

    const newJob = new Job({
      title,
      company,
      location,
      salary,
      role,
      skills:[skills],
      postedtime: new Date().toLocaleString(),
      companyid: companyid,
    });
    console.log(newJob);
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


//view job applications


app.get('/viewApplications/:id', async (req, res) => {
  try {
    const jobid  = req.params.id;
    const details = await Job.find({ "_id" : jobid});
    const applications = details[0].applicants;
    const arr = [];
    for (const element of applications) {
      const user = await User.find({ "_id": element });
      // console.log(user);
      arr.push(user[0]);
    }
    res.send(arr);
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


//apply for a job

app.post('/apply/:userid/:jobid', async (req, res) => {
  try {

    const  userid = req.params.userid;
    const  jobid  = req.params.jobid;

    const details = await Job.findByIdAndUpdate(jobid, { $push: { applicants: userid } }, { new: true })
    if(details){
      res.send(details);
    }
    else{
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


    

// Connect to the MongoDB database
connectToDB(() => {
  console.log('Connected to the database.');
});

const port = process.env.PORT || 8000; // Set the port number

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
