const express = require('express');          //creating an express suppoter
const app = express();
app.use(express.json());
const port = 5000;

//This is the entry point of the application
const cors = require('cors');
app.use(cors());

require('dotenv').config();
const Project = require('./Project');
const Blog = require('./Blog');

app.get('/', (req, res) => {       //End point ('/')
    console.log(req);
    console.log('Helo world from console.')
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

app.get('/blogs', async (req, res) => {
  try {
      const blogs = await Blog.find();
      res.json(blogs);
  }catch (err) {
      res.status(500).json({ message: err.message});
  }
});

app.post('/projects', async (req, res) => {
    //Get output to console
    console.log(req.body);

    //send data to Frontend
    // res.send("Creating a project");
  
    const project = new Project(req.body);
    try {
      const newProject = await project.save();
      res.status(201).json(newProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});
  
//create an endpoint to update a project by id
app.patch('/projects/:id', async (req, res) => {
    const {id: _id } = req.params;
    const project = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      _id,
      { $set: project },
      { new: true }
    );

    res.json(updatedProject);
}); 

app.listen(port, () => {       //Our Nodejs project runs because of this
  console.log(`Server running at http://localhost:${port}/`);
});

//create an endpoint to delete a project by id
app.delete('/projects/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const project = await Project.findByIdAndDelete(id);

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      } 

      res.json({ message: 'Deleted project'});
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ message: 'Failed to delete project' });
    }
});

