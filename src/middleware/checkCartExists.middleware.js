import { request, response } from "express";
import cartRepository from "../managers/cart.repository.js";

export const checkCartExists = async (req = request, res = response, next) => {
  try {
    const { cId } = req.params;

    const findCart = await cartRepository.getById(cId);

    if (!findCart)
      return res
        .status(404)
        .json({ status: "Not found", message: "Cart not found" });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};
