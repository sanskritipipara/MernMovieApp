const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
{
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    postId: {
        type: String,
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }

}, { timestamps: true })


module.exports = mongoose.model('Comment', commentSchema);
