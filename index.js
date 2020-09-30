require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const path = require("path");


//DB Connection  
// mongoose
//   .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/movies" , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
//   })
//   .then(() => {
//     console.log("DB CONNECTED");
//   })
//   .catch(() => {
//     console.log("NOT");
//   })
//ONGRCOROotgXagJ5
  mongoose.connect('mongodb+srv://sanskriti:Z6H5puA2bfAVcNEv@cluster0.cgenr.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () =>{
   console.log("database connected!!")
})
mongoose.connection.on('error', (err) =>{
   console.log("Error in connecting database", err)
})

  //MY ROUTES
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movie");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");
const favRoutes = require("./routes/favorite");
//middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static('FMernProject/build'));
// }

  
//my routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", movieRoutes);
app.use("/api", commentRoutes);
app.use("/api", likeRoutes);
app.use("/api", favRoutes)
  
const PORT = process.env.PORT || 5000 ;

//Starting a server
app.listen(PORT, () => {
  console.log(`app is running at ${PORT}`)
});
app.get("*", (req, res) => {
  return res.send("this is admin dashboard"); }
  )
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "FMernProject", "build", "index.html"));
// });