const express = require('express');

const Project = require('./projectModel');

const router = express.Router();

router.get('/', (req, res)=> {
    Project
        .get()
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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Project
        .get(id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({
                    message: "The project with the specified ID does not exist."
                });
            };
        })
        .catch(err => {
            res.status(500).json({
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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const projectInfo = req.body;
    Project
        .update(id, projectInfo)
        .then(updatedProject => {
            if(updatedProject) {
                res.status(200).json({
                    message: "Project was updated successfully."
                });
            } else {
                res.status(404).json({
                    message: "The project with the specified ID does not exist."
                });
            };
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "There was a problem updating the project."
            });
        });
});

router.get('/:id/actions', (req, res) => {
    const actions = req.params.id;
    Project
        .getProjectActions(actions)
        .then(action => {
            if (action.length !== 0) {
                res.status(200).json(action);
            } else {
                res.status(404).json({
                    message: "The project with the specified ID does not exist."
                });
            };
        })
        .catch(err => {
            res.status(500).json({
                message: "The project could not be retrieved."
            });
        });
});

module.exports = router;