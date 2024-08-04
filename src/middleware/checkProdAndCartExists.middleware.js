import { request, response } from "express";
import cartDao from "../dao/managers/cart.dao.js";

export const checkProdAndCartExists = async (
  req = request,
  res = response,
  next
) => {
  try {
    const { cId, pId } = req.params;

    const findCart = await cartDao.getById(cId);

    if (!findCart)
      return res
        .status(404)
        .json({ status: "Not found", message: "Cart not found" });

    const findProduct = findCart.products.find((p) => (p.product = pId));

    if (!findProduct) {
      return res
        .status(404)
        .json({ status: "Not found", message: "Product not found in cart" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};
