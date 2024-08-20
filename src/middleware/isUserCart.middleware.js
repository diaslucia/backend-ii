import { request, response } from "express";

export const isUserCart = async (req = request, res = response, next) => {
  const { cId } = req.params;
  if (req.user.cart._id !== cId)
    return res
      .status(401)
      .json({ status: "error", message: "Invalid cart id" });

  next();
};
