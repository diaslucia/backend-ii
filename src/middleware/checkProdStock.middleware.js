import { request, response } from "express";
import cartRepository from "../managers/cart.repository.js";

export const checkProdStock = async (req = request, res = response, next) => {
  try {
    const { cId } = req.params;

    const findCart = await cartRepository.getById(cId);

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};
