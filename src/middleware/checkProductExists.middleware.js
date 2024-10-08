import { request, response } from "express";
import productRepository from "../managers/products.repository.js";

export const checkProductExists = async (
  req = request,
  res = response,
  next
) => {
  try {
    const { pId } = req.params;

    const findCart = await productRepository.getById(pId);

    if (!findCart)
      return res
        .status(404)
        .json({ status: "Not found", message: "Product not found" });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};
