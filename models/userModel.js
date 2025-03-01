// 

// const mongoose = require("mongoose");
import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        useremail:{
            type: String,
            required: true
        },
        userpassword:{
            type: String,
            required: true
        },
        userrole:{
            type: String,
            default: "user",
            enum:["user" , "admin"]
        },
        // tokens:{
        //     accessTokens: { type: String },
        // }
       

    }
);
// const User = mongoose.model("User", userSchema);
// export default User;

const User = mongoose.model("User", userSchema);
// module.exports = User;
export default User;

