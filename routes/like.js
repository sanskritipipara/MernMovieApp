const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

const {isSignedIn, isAuthenticated} = require("../controllers/auth");
const { getUserById } = require('../controllers/user');
const { getMovieById } = require('../controllers/movies');
const { getCommentById } = require('../controllers/comment');

router.param("userId", getUserById);
router.param("movieId",getMovieById);
 router.param("commentId",getCommentById);


router.post("/getLikes",  (req, res) => {

    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId }
    } else {
        variable = { commentId: req.body.commentId }
    }
    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })
})

router.post("/getDislikes", (req, res) => {

    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes })
        })
})


router.post("/upLike/:userId", isSignedIn, isAuthenticated, getUserById, (req, res) =>
 {
    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId , userId: req.profile}
    } else {
        variable = { commentId: req.body.commentId, userId: req.profile}
    }

    const like = new Like(variable)
    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });
        //In case disLike Button is already clicked, we need to cancel the dislike  
        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
           })
    })
})

router.post("/upDisLike/:userId",isSignedIn, isAuthenticated, getUserById, (req, res) => {

    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId, userId: req.profile }
    } else {
        variable = { commentId: req.body.commentId , userId: req.profile }
    }

    const disLike = new Dislike(variable)
    //save the like information data in MongoDB
    disLike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });
        //In case Like Button is already clicked, we need to decrease the like by 1 
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })
})

router.post("/unDisLike/:userId",isSignedIn, isAuthenticated,  getUserById,(req, res) =>
 {
    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId, userId: req.profile }
    } else {
        variable = { commentId: req.body.commentId , userId: req.profile }
    }

    Dislike.findOneAndDelete(variable)
    .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })


})
router.post("/unLike/:userId", isSignedIn, isAuthenticated, getUserById, (req, res) => {

    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId, userId: req.profile }
    } else {
        variable = { commentId: req.body.commentId , userId: req.profile }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })

})

module.exports = router;
