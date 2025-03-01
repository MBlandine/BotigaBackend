import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productCategory: { type: String, required: true },
  productDiscount: { type: Number, default: 0 },
  productImage: { type: String, required: true }, // URL from Cloudinary
});

const Product = mongoose.model("Product", productSchema);
export default Product;
