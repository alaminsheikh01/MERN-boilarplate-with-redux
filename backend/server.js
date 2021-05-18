import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // db file import

dotenv.config(); // dotenv initilizatioln
connectDB(); // database connection
const app = express();

//import router
import registerRoutes from "./routes/userRoutes.js";

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

// router uses
app.use("/api/users", registerRoutes);

const port = 5000 || process.env.PORT;

app.listen(port, console.log(`server is running on ${port}`.yellow.bold));
