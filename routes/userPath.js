import { Login, Register, getAllUsers} from "../controllers/userController.js";
import express from "express";

const userRouter=express();

userRouter.get("/", getAllUsers);
userRouter.post("/login",Login);
userRouter.post("/register",Register);

export default userRouter;

