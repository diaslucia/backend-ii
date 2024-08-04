import { request, response } from "express";

export const checkProductPost = async (req = request, res = response, next) => {
  try {
    const { description, code, price, stock, category } = req.body;
    let errors = "";

    if (!description) {
      errors = "Field 'description' is mandatory";
    } else if (!code) {
      errors = "Field 'code' is mandatory";
    } else if (typeof price !== "number" || price <= 0) {
      errors = "Field 'price' must be a positive number";
    } else if (typeof stock !== "number" || stock < 0) {
      errors = "Field 'stock' must be a whole no negative number";
    } else if (!category) {
      errors = "Field 'category' is mandatory";
    }

    if (errors.length) {
      return res.status(400).json({
        status: "Bad request",
        payload: errors,
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};
