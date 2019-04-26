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



module.exports = router;