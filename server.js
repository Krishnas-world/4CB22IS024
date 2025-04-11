const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/db");
const usersRoutes = require("./routes/users/index");
const postsRoutes = require("./routes/posts/index")

dotenv.config();

const app = express();
const port =  3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use("/", usersRoutes);
app.use("/", postsRoutes)

connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
