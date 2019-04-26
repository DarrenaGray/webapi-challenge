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
                errorMessage: "The project could not be retrieved."
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
                errorMessage: "There was a problem saving this project."
            });
        });
});

module.exports = router;