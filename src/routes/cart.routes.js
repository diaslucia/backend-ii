import { Router } from "express";
import cartDao from "../dao/managers/cart.dao.js";
// Middlewares
import { checkCartExists } from "../middleware/checkCartExists.middleware.js";
import { checkProdAndCartExists } from "../middleware/checkProdAndCartExists.middleware.js";
import { checkCartPost } from "../middleware/checkCartPost.middleware.js";
import { isUserCart } from "../middleware/isUserCart.middleware.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const cart = await cartDao.getAll();

    res.status(200).json({ status: "success", data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});

router.get("/:cId", checkCartExists, async (req, res) => {
  try {
    const { cId } = req.params;

    const cart = await cartDao.getDataById(cId);

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});

router.post("/", checkCartPost, async (req, res) => {
  try {
    const cartData = req.body;
    const cart = await cartDao.create(cartData);

    res.status(201).json({ status: "success", data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});

router.post(
  "/:cId/product/:pId",
  checkCartExists,
  isUserCart,
  async (req, res) => {
    try {
      const { cId, pId } = req.params;

      const findCart = await cartDao.getById(cId);
      let cart;

      if (findCart.products.find((i) => i.product == pId)) {
        cart = await cartDao.updateQuantityInCart(cId, pId);
      } else {
        cart = await cartDao.addProductInCart(cId, pId);
      }

      res.status(200).json({ status: "success", data: cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Error", message: "Internal server error" });
    }
  }
);

router.delete(
  "/:cId/product/:pId",
  checkProdAndCartExists,
  async (req, res) => {
    try {
      const { cId, pId } = req.params;

      const cart = await cartDao.deleteProductInCart(cId, pId);

      res.status(200).json({ status: "success", data: cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Error", message: "Internal server error" });
    }
  }
);

router.put("/:cId/product/:pId", checkProdAndCartExists, async (req, res) => {
  try {
    const { cId, pId } = req.params;
    const { quantity } = req.body;

    const cart = await cartDao.updateProductInCart(cId, pId, quantity);

    res.status(200).json({ status: "success", data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});

router.delete("/:cId", checkCartExists, async (req, res) => {
  try {
    const { cId } = req.params;

    const cart = await cartDao.clearProductsInCart(cId);

    res.status(200).json({ status: "success", data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});

export default router;
