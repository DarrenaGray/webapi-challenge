const express = require('express');

const Project = require('./projectModel');

const router = express.Router();

router.get('/', (req, res)=> {
    const { id } = req.params;
    Project
        .get(id)
        .then(projects => {           
                res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The project could not be retrieved."
            });
        });
});

router.post('/', (req, res) => {
    const projectInfo = req.body;
    Project
        .insert(projectInfo)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "There was a problem saving this project."
            });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Project
        .remove(id)
        .then(deletedProject => {
            if(deletedProject) {
                res.status(201).json({
                    message: "Project was deleted successfully."
                });
            } else {
                res.status(404).json({
                    message:  "The project with the specified ID does not exist."
                });
            };
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The project could not be deleted."
            });
        });
});

module.exports = router;