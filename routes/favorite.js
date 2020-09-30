const express = require('express');
const router = express.Router();

const {getUserById} = require("../controllers/user");
const {getMovieById} = require("../controllers/movies")

const {isSignedIn, isAuthenticated} = require("../controllers/auth");
const Favorites = require('../models/Favorites');

router.param("userId", getUserById);
router.param("movieId",getMovieById);

router.post("/check", (req,res) => {
    const favorite =  new Favorites({
        movieId: req.body.movieId
    });
    res.json(favorite);
})

//for counting no of likes/favorites on any movie 
router.post("/favoriteNumber", (req, res) => {

    Favorites.find({ "movieId": req.body.movieId })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err)

            res.status(200).json({ success: true, subscribeNumber: subscribe.length })
        })

});


router.post("/favorited/:userId", isSignedIn, isAuthenticated, getUserById,
(req, res) => {
    // console.log("in here")
    Favorites.find({ "movieId": req.body.movieId, "userFrom": req.profile })
        .exec((err, inFav) => {
            if (err) return res.status(400).send(err)

            let result = false;
            if (inFav.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, inFav: result })
        })

});



router.post("/addToFavorite/:userId",isSignedIn, isAuthenticated, (req, res) => {

    // console.log(req.body)

    const favorite = new Favorites(req.body);
    favorite.userFrom = req.profile;
    favorite.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true , doc})
    })

});


router.post("/removeFromFavorite/:userId",isSignedIn, isAuthenticated,getUserById, (req, res) => {


    Favorites.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.profile })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc })
        })
});


router.post("/getFavoredMovie/:userId", 
isSignedIn, isAuthenticated, getUserById,
(req, res) => {

    Favorites.find({ 'userFrom': req.profile })
        .exec((err, favorite) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, favorite })
        })
});



module.exports = router;
