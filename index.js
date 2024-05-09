const express = require('express');          //creating an express suppoter
const app = express();
const port = 5000;


require('dotenv').config();
const Project = require('./Project');

app.get('/', (req, res) => {             //End point ('/')
    res.send('Hello, World!');
});

app.get('/projects', async (req, res) => {    //End point
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/projects', async (req, res) => {    //End point
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {       //Our Nodejs project runs because of this
    console.log(`Server running at http://localhost:${port}/`);
});
