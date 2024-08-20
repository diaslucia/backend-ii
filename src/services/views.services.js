import { productModel } from "../models/product.model.js";

const getProducts = async () => {
  return await productModel.find({}).lean();
};

export default {
  getProducts,
};
