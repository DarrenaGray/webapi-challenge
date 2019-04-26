const express = require('express');

const Action = require('./actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    Action
        .get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The action could not be retrieved."
            });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Action
        .get(id)
        .then(action => {
            if (action.length !== 0) {
                res.status(200).json(action);
            } else {
                res.status(404).json({
                    message: "The action with the specified ID does not exist."
                });
            };
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The action information could not be retrieved."
            })
        });
});



module.exports = router;