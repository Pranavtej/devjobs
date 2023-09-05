
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('DevJobs API');

  });

  
module.exports = (req, res) => {
    app(req, res);
  };
  