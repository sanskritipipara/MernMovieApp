const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const moviesSchema = new mongoose.Schema(
  {
    // MovieId:{
    //   type: String,
    //   unique: true
    // },
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 5000
    },
    release_date: {
      type: String,
      trim: true
    },
    // category: {
    //   type: ObjectId,
    //   ref: "Category",
    //   required: true
    // },
    vote_average: {
      type: Number
    },
    runtime: {
      type: String
    },
    vote_count : {
        type: Number
    },
    status: {
        type: String
    },
    popularity: {
        type: String
    },
    photo: {
      data: Buffer,
      contentType: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movies", moviesSchema);
