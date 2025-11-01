const Product = require("../models/product.model.js");
const { z } = require("zod");


const productValidator = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters long."),
  quantity: z.number().int().nonnegative("Quantity must be a non-negative integer."),
  price: z.number().nonnegative("Price must be a non-negative number."),
  image: z.string().url("Invalid image URL format."),
});


const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};


const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};


const createProduct = async (req, res) => {
  try {
  
    const parsedData = productValidator.parse(req.body);

   
    const newProduct = await Product.create(parsedData);
    res.status(201).json(newProduct);
  } catch (error) {
    if (error instanceof z.ZodError) {
 
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

 
    const parsedData = productValidator.partial().parse(req.body);

    const updatedProduct = await Product.findByIdAndUpdate(id, parsedData, { new: true });

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
