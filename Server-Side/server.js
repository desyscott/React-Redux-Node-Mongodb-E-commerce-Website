import  express from "express";
import colors  from "colors";
import dotenv  from "dotenv";
import cors  from "cors";
import morgan  from "morgan";
import cookieParser  from "cookie-parser";

const app = express();

import {data} from './data/ProductData.js'
import {requireAuth,authCurrentUser}  from "./middleware/authMiddleware.js";

import authRoute  from "./routes/authRoute.js";

import connectDB  from "./db.js";

dotenv.config();
connectDB();

app.use(express.urlencoded({ limit: "10mb", extended: false }));
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

app.get("/api/products/:id",(req, res) => {
  const product = data.productData.find(x=>x._id === req.params.id )
  if(product){
    res.send(product)
  }else{
    res.status(404).send({message:"Product Not Found"})
  }
});

app.get("/api/products",  (req, res) => {
  res.json(data.productData);
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
