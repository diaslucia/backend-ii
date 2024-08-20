import { request, response } from "express";
import viewsServices from "../services/views.services.js";

const getView = async (req = request, res = response) => {
  try {
    const products = await viewsServices.getProducts();
    res.render("index", { styles: "styles.css", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

export default {
  getView,
};
