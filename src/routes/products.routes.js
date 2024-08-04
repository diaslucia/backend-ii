import { Router } from "express";
import productDao from "../dao/managers/products.dao.js";
// Middlewares
import { checkProductExists } from "../middleware/checkProductExists.middleware.js";
import { checkProductPut } from "../middleware/checkProductPut.middleware.js";
import { checkProductPost } from "../middleware/checkProductPost.middleware.js";
import { authorization } from "../middleware/authorization.middleware.js";

const router = Router();

router.get("/", authorization("user"), async (req, res) => {
  try {
    const { limit, page, sort, category } = req.query;
    let products;

    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        price: sort === "asc" ? 1 : -1,
      },
      learn: true,
    };

    if (category) {
      products = await productDao.getAll({ category }, options);
    }

    products = await productDao.getAll({}, options);
    res.status(200).json({ status: "Success", data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});

router.get("/:pId", checkProductExists, async (req, res) => {
  try {
    const { pId } = req.params;
    const product = await productDao.getById(pId);

    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});

router.post("/", checkProductPost, async (req, res) => {
  try {
    const productData = req.body;
    const product = await productDao.create(productData);

    res.status(201).json({ status: "success", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});

router.put("/:pId", checkProductExists, checkProductPut, async (req, res) => {
  try {
    const { pId } = req.params;
    const productData = req.body;

    const product = await productDao.update(pId, productData);

    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});

router.delete("/:pId", checkProductExists, async (req, res) => {
  try {
    const { pId } = req.params;

    const products = await productDao.deleteOne(pId);

    res.status(200).json({
      status: "Success",
      message: `Product with id ${pId} was deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});

export default router;
