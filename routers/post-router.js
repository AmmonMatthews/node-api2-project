const express = require("express");

const Post = require("../data/db.js");

const router = express.Router();


// Route handlers

// GET Request
// Tested
router.get("/", (req, res) => {
    Post.find().then(posts =>{
        res.status(201).json(posts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved" })
    });
})

// Tested
router.get("/:id", (req, res) => {
    const { id } = req.params

    if(!id){
        res.status(404).json({ message: "the pos with the specified ID does not exist"})
    } else{
        Post.findById(id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved" })
        });
    }
})


router.get("/:id/comments", (req, res) => {
    const { id } = req.params
    

    if(!id){
        res.status(404).json({ message: "the post with the specified ID does not exist"})
    } else {
        Post.findCommentById(id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved" })
        });
    }
})
// POST Request 
// Tested
router.post("/", (req, res) => {
    const postInfo = req.body

    if(!postInfo.title || !postInfo.contents){
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
    } else {
       return Post.insert(postInfo)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            console.log(err);
           res.status(500).json({ error: "There was an error while saving the post to the database"})
    })  
    }
})
// Tested
router.post("/:id/comments", (req, res) => {
    const { id } = req.params;
    const comments = { ...req.body, post_id: id}
    
    if(!comments.text){
        return res.status(400).json({ errorMessage: "Please provide title."})
    } else { 
        return Post.insertComment(comments)
        .then(comment => {
            if(!comment){
                res.status(404).json({ message: "the post with the specified ID does not exist. "})
            } else {
                res.status(201).json(comment)
            }
        })
            .catch(err => {
                console.log(err);
               res.status(500).json({ error: "There was an error while saving the post to the database"})

        })
    }
})
// Tested
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    if(!id){
        res.status(404).json({ message: "The post with the specified ID does not exist."})
    } else {
        Post.remove(id)
        .then( post => {
            console.log(post)
            res.status(200).json({ message: "post has been deleted"})
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
              message: "Error removing the hub",
            });
    })

}})


router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if(!id){
        res.status(404).json({ message: "The post with the specified ID does not exist."})
    } else if (!changes.title || !changes.contents) {
        res.status(400).json({ errorMessage: "please provide title and contents for the post"})
    } else {
        Post.update(id, changes)
            .then(post => {
               res.status(200).json(post)
            })
            .catch(err => {
                res.status(500).json({ error: "The post information could not be modified."})
            })
    }

})


module.exports = router;
