const express = require("express");
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const {getMovieById, createMovie, getMovie, photo, 
    deleteMovie, updateMovie, getAllMovies} = require("../controllers/movies")

//params
router.param("userId", getUserById);
router.param("movieId", getMovieById);

//actual routes
//create
router.post("/movie/create/:userId",isSignedIn, isAuthenticated, isAdmin, createMovie);

//read 
router.get("/movie/:movieId", getMovie);
router.get("/movie/photo/:movieId", photo);

//delete
router.delete("/movie/:movieId/:userId", isSignedIn, isAdmin, isAuthenticated, isAdmin, deleteMovie );

//update
router.put("/movie/:movieId/:userId", isSignedIn, isAdmin, isAuthenticated, isAdmin, updateMovie );

//listing route
router.get("/movies", getAllMovies);

module.exports = router;