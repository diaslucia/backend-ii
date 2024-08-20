import { productModel } from "../models/product.model.js";

const getAll = async (query, options) => {
  const products = await productModel.paginate(query, options);
  return products;
};

const getById = async (pId) => {
  const product = await productModel.findById(pId);
  return product;
};

const create = async (data) => {
  const product = await productModel.create(data);
  return product;
};

const update = async (pId, data) => {
  const product = await productModel.findByIdAndUpdate(pId, data, {
    new: true,
  });
  return product;
};

const deleteOne = async (pId) => {
  const product = await productModel.findByIdAndUpdate(
    pId,
    { status: false },
    { new: true }
  );
  return product;
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
