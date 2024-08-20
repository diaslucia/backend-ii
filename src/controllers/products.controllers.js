import { request, response } from "express";
import productsServices from "../services/products.services.js";

const getProducts = async (req = request, res = response) => {
  try {
    const { limit, page, sort, category } = req.query;
    let products;

    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        price: sort === "asc" ? 1 : -1,
      },
      learn: true,
    };

    if (category) {
      products = await productsServices.getProducts(category, options);
    }

    products = await productsServices.getProductsCategory({}, options);
    res.status(200).json({ status: "Success", data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const getProductById = async (req = request, res = response) => {
  try {
    const { pId } = req.params;
    const product = await productsServices.getProductById(pId);

    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const postProduct = async (req = request, res = response) => {
  try {
    const productData = req.body;
    const product = await productsServices.postProduct(productData);

    res.status(201).json({ status: "success", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const putProduct = async (req = request, res = response) => {
  try {
    const { pId } = req.params;
    const productData = req.body;

    const product = await productsServices.putProduct(pId, productData);

    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const deleteProduct = async (req = request, res = response) => {
  try {
    const { pId } = req.params;

    const products = await productsServices.deleteProduct(pId);

    res.status(200).json({
      status: "Success",
      message: `Product with id ${pId} was deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

export default {
  getProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};
