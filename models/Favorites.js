const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
{
    userFrom: {
        type: ObjectId,
        ref: 'User'
    },
    movieId : {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime : {
        type: String
    }

}, { timestamps: true });


module.exports = mongoose.model('Favorite', favoriteSchema);
