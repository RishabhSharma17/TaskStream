import express from "express";
import cors from "cors";
import userRouter from "./Router/User.Router.js";
import { zapRouter } from "./Router/Zap.Router.js";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user/",userRouter);

app.use("/api/v1/zap/",zapRouter);

console.log("DB URL:", process.env.DATABASE_URL);


app.listen(5000,()=>{
    console.log("server started at 5000");
});