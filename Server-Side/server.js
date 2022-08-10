import  express from "express";
import colors  from "colors";
import dotenv  from "dotenv";
import cors  from "cors";
import morgan  from "morgan";
import cookieParser  from "cookie-parser";

const app = express();


import {requireAuth,authCurrentUser}  from "./middleware/authMiddleware.js";

import authRoute  from "./routes/authRoute.js";
import productRoute from "./routes/productsRoute.js"

import connectDB  from "./db.js";

dotenv.config();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

//always the first parameter is the req
app.get("/user1", requireAuth, (req, res) => {
  res.json({
    userList: ["des", "desmond", "essuman", "alice"],
  });
});


app.use("/api/auth", authRoute);
app.use("/api/products",productRoute);

app.use((err,req,res,next)=>{
  res.status(500).send({message:err.message})
})

const PORT = process.env.PORT || 5000;
const HOSTNAME = "localhost";

//Always the port must be the first parameter
app.listen(PORT, HOSTNAME, () => {
  console.log(
    `Express server is running in the ${process.env.NODE_ENV} mode at http://${HOSTNAME}:${PORT} 🚀`
      .yellow.bold
  );
});
