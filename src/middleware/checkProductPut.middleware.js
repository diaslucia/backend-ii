import { request, response } from "express";

export const checkProductPut = async (req = request, res = response, next) => {
  try {
    const { id } = req.body;

    if (id) {
      return res.status(400).json({
        status: "Bad request",
        payload: "Field ID can´t be modified",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};
