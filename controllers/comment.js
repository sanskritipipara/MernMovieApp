const Comment = require("../models/Comment");


exports.getCommentById = (req, res, next, id) => {
    Comment.findById(id)
    .exec((err, comment) => {
        if(err) {
            return res.status(400).json({
                error: "Comment not found"
            });
        }
        req.comment = comment;
        next();
    });
};