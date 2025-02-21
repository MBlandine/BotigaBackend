import { createContact, getAllcontact , getContactById, deleteContactById, updateDataById} from "../controllers/contactControllers.js";
import express from "express";

const contactRouter = express.Router();

contactRouter.post("/createContact",createContact);
contactRouter.get("/getAllContact", getAllcontact);
contactRouter.get("/getContactById/:Id",getContactById);
contactRouter.delete("/deleteContactById/:Id",deleteContactById);
contactRouter.put("/updateDataById/:Id",updateDataById);

export default contactRouter;