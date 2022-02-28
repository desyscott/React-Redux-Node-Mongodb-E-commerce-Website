const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

const { authMiddleware } = require("./middleware/authMiddleware.js");

const authRoute = require("./routes/authRoute");

const connectDB = require("./db");

dotenv.config();
connectDB();

app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

//always the first parameter is the req
app.get("/user1", authMiddleware, (req, res) => {
  res.json({
    userList: ["des", "desmond", "essuman", "alice"],
  });
});

app.use("/auth", authRoute);

const PORT = process.env.PORT || 5000;
const HOSTNAME = "localhost";

//Always the port must be the first parameter
app.listen(PORT, HOSTNAME, () => {
  console.log(
    `Express server is running in the ${process.env.NODE_ENV} mode at http://${HOSTNAME}:${PORT} 🚀`
      .yellow.bold
  );
});
