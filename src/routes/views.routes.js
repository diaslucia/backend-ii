import { Router } from "express";
import { productModel } from "../dao/models/product.model.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find({}).lean();
    res.render("index", { styles: "styles.css", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});

export default router;
