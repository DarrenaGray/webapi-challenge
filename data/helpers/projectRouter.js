const express = require('express');

const Project = require('./projectModel');

const router = express.Router();

router.get('/:id', (req, res)=> {
    const { id } = req.params;
    Project
        .get(id)
        .then(project => {
            if(project) {                
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message: "The project with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "The project could not be retrieved."
            })
        })
})

module.exports = router;