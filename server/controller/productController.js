import Product from "../models/productModel.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

export const postProduct = async (req, res) => {
  try {
    const { title, description, price, location } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    console.log(req.body)

    const newProduct = new Product({ title, description, price, location, image });
    await newProduct.save();

    res.status(201).json({ message: "Product posted successfully!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error posting product", error });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};
