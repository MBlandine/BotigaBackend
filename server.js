import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mainRouter from './routes/indexRouting.js';
import cors from "cors";
import cloudinary from "cloudinary";



dotenv.config();
const port = process.env.PORT || 3000
const db_user = process.env.DB_USER;
const db_name = process.env.DB_NAME;
const db_pass = process.env.DB_PASS;


// require("dotenv").config();
// const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use('/', mainRouter);
app.use(cors());


//connect to mongo DB
const dbUrl = process.env.MONGO_URL;
mongoose.set("strictQuery", false); 
mongoose.connect(dbUrl)

.then(() => { console.log("Connected to MongoDB");

        
//port  
app.listen(port, () => {
      console.log(`Node API is running on port http://localhost:${port}`);
    });
})


//error
.catch((error) => { console.log(error);


});





