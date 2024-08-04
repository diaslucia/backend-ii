import { request, response } from "express";

export const checkCartPost = (req = request, res = response, next) => {
  try {
    const { products } = req.body;

    if (!products) {
      return res.status(400).json({
        status: "Bad request",
        message: "Field 'products' is mandatory",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};
