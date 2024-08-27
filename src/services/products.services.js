import productRepository from "../managers/products.repository.js";

const getProducts = async (category, options) => {
  return await productRepository.getAll({ category }, options);
};

const getProductsCategory = async (options) => {
  return await productRepository.getAll({}, options);
};

const getProductById = async (pId) => {
  return await productRepository.getById(pId);
};

const postProduct = async (productData) => {
  return await productRepository.create(productData);
};

const putProduct = async (pId, productData) => {
  return await productRepository.update(pId, productData);
};

const deleteProduct = async (pId) => {
  return await productRepository.deleteOne(pId);
};

export default {
  getProducts,
  getProductsCategory,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};
