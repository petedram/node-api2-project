const express = require('express');
const DB = require('../data/db.js'); // database

const router = express.Router();

//move over endpoints API specific


//POST request to /api/posts:
router.post('/posts', (req, res) => {
    const postInfo = req.body;
    console.log('postInfo', postInfo);
    if (postInfo.title && postInfo.contents) {
        DB.insert(req.body)
        .then(db => {
            res.status(201).json(db);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the post to the database",
            });
        });
    } else {
        console.log('object error');
            res.status(400).json({
                errorMessage: "Please provide title and contents for the post.",
            });
    }
});

// POST request to /api/posts/:id/comments
router.post('/posts/:id/comments', (req, res) => {
    const postInfo = {...req.body, post_id: req.params.id }
    console.log('postInfo', postInfo);
    if (postInfo.text) {
        DB.insertComment(postInfo)
        .then(db => {
            if (db) {
                res.status(201).json(db);
            } else {
                res.status(404).json( { message: 'The post with the specified ID does not exist.' } )
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the post to the database",
            });
        });
    } else {
        console.log('object error');
            res.status(400).json({
                errorMessage: "Please provide text for the comment.",
            });
    }
});



//GET request to /api/posts:
router.get('/posts', (req, res) => {
    DB.find(req.query)
        .then(db => {
            res.status(200).json(db);
            res.send('/test yup!');
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The posts information could not be retrieved.",
            })
        })
});

//GET request to /api/posts/:id


// GET request to /api/posts/:id/comments


// DELETE request to /api/posts/:id 


// PUT request to /api/posts/:id







module.exports = router;
