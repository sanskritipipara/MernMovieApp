const express = require('express');
const router = express.Router();

const {isSignedIn, isAuthenticated} = require("../controllers/auth");
const {getUserById} = require("../controllers/user")
const {getMovieById} = require("../controllers/movies");
const Comment = require('../models/Comment');

router.param("userId", getUserById);
router.param("movieId",getMovieById);
// router.param("commentId",getCommentById);

router.post("/:userId/:movieId/saveComment",
getUserById, getMovieById, 
isSignedIn, isAuthenticated,  
(req, res) => {
    // console.log("in save");

    req.body.writer = req.profile;
    req.body.postId = req.movie;
    const comment = new Comment({
        content: req.body.content,
        writer:req.profile,
        postId : req.movie._id,
        responseTo:req.body.responseTo
    });
    comment.save((err, comment) => {
        if(err){
            return res.json({
                success: false,
                err
            })
        }
        Comment.find({'_id': comment._id})
        .populate('writer')
        .exec((err, result) => {
            if(err){
                return res.json({
                    success: false, 
                    err
                })
            }
             return res.status(200).json({
                success: true,
                result
             })
        });
    });
});

router.post("/getComments", (req, res) => {
    Comment.find({"postId": req.body.movieId})
    .populate('writer')
    .exec((err, comments) => {
        // console.log("how:",comments) 
        if(err) return res.status(400).send(err)
        return res.status(200).json({
            success: true, comments
        })
    })
});
module.exports = router;