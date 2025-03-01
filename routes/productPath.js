import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import express from "express"
import multer from "multer"
import {Admin} from "../middlewares/roleidentification.js"
import {auth}from "../middlewares/tokenVerification.js"


const productRouter = express.Router();

const upload = multer({ dest: "uploads/" }); // Temporary storage

productRouter.post("/createProduct", upload.single("image"),Admin, auth, createProduct);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.get("/getProductById:id", getProductById);
productRouter.put("/updateProduct:id", upload.single("image"), updateProduct);
productRouter.delete("/deleteProduct:id", deleteProduct);

export default productRouter;
