import express, { Express } from "express";
import mongoose from "mongoose";
import FinancialRecordModal from "./financial-record";
import  FinancialRecordRouter  from "./routes/financial-records";
import cors from 'cors'
const app: Express = express();
const port: number | string = process.env.PORT || 3001;

app.use(express.json()); 
app.use(cors());
const mongoURL: string =
  "mongodb+srv://vishwajeetwalse9767:17hU0ER7eHQTYEm9@personalfinancetracker.txgz8.mongodb.net/";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("Failed to connect mongoDb", err);
  });

app.use('/financial-records',FinancialRecordRouter)


  app.listen(port,()=>{
    console.log(`Server Running on the port ${port}`);

  })



