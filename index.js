const express = require('express');          //creating an express suppoter
const app = express();
const port = 4000;

app.use(express.json());

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

app.post("/projects", async (req, res) => {
    console.log(req.body);
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
  app.patch("/projects/:id", async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (project) {
        project.set(req.body);
        const updatedProject = await project.save();
        res.json(updatedProject);
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
});  

//create an endpoint to delete a project by id
app.delete("/projects/:id", async (req, res) => {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (project) {
        res.json({ message: "Project deleted" });
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  
const Blog = require('./Blogs')

app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    }catch (err) {
        res.status(500).json({ message: err.message});
    }
})

app.listen(port, () => {       //Our Nodejs project runs because of this
    console.log(`Server running at http://localhost:${port}/`);
});
