import express from 'express';
const app = express()
import dotenv from 'dotenv';
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js"
import cors from 'cors';
import userRoute from './routes/userRoute.js'

app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 4000 ;
const URI = "mongodb://localhost:27017/bookStore";

// db connection
// try{
//   mongoose.connect(URI,{
//     useNewUrlParser: true, useUnifiedTopology: true
//   });
// console.log("connected to mongoDB ");

// }catch(err){
//   console.log('i dont know whats the problem !!!!!!!!!!!!!!!!!!!!!!!!!1')
//   console.log('error: ',err);

// }


mongoose.connect(URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family:4
})

const db = mongoose.connection;

db.on('connected',()=>{
  console.log('connected to mongoDB server');
})

db.on('error',(err)=>{
  console.log('ERROR ! mongoDB server',err);
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// defining routes
app.use("/book",bookRoutes)

app.use('/user',userRoute)
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})