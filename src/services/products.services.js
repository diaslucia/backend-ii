import { respProductDto } from "../dto/product.dto.js";
import productRepository from "../managers/products.repository.js";

const getProducts = async (category, options) => {
  return await productRepository.getAll({ category }, options);
};

const getProductsCategory = async (options) => {
  return await productRepository.getAll({}, options);
};

const getProductById = async (pId) => {
  const productData = await productRepository.getById(pId);
  // esto es un ejemplo, pasarlo a otro lado
  return respProductDto(productData);
};

const postProduct = async (productData) => {
  return await productRepository.create(productData);
};

const putProduct = async (pId) => {
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
