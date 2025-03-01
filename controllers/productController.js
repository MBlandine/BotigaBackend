import Product from "../models/productModel.js";
import cloudinary from "cloudinary";
import fs from "fs";


// Upload file to Cloudinary
export const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder: "products" });
    fs.unlinkSync(filePath); // Delete local file after upload
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { productName, productPrice, productCategory, productDiscount } = req.body;
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const imageUrl = await uploadToCloudinary(req.file.path);
    const product = new Product({ productName, productPrice, productCategory, productDiscount, productImage: imageUrl });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get Product by ID
export const getProductById = async (req, res) => {
  try {
    const {Id} = req.params;
    const products = await Product.findById(req.params.Id);
    if (!products) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    // res.json(product);
    res.status(200).json({ success: true, products });
    } 
    catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { productName, productPrice, productCategory, productDiscount } = req.body;
    let updateData = { productName, productPrice, productCategory, productDiscount };

    if (req.file) {
      const imageUrl = await uploadToCloudinary(req.file.path);
      updateData.productImage = imageUrl;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
