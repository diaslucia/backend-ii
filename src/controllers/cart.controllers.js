import { request, response } from "express";
import cartServices from "../services/cart.services.js";
import ticketServices from "../services/ticket.services.js";

const createCart = async (req = request, res = response) => {
  try {
    const cart = await cartServices.createCart();
    res.status(200).json({ status: "success", data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const getCartById = async (req = request, res = response) => {
  try {
    const { cId } = req.params;

    const cart = await cartServices.getCartById(cId);

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const postCart = async (req = request, res = response) => {
  try {
    const cartData = req.body;
    const cart = await cartServices.postCart(cartData);

    res.status(201).json({ status: "success", data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const postProductInCart = async (req = request, res = response) => {
  try {
    const { cId, pId } = req.params;

    const findCart = await cartServices.postProductInCart(cId);
    let cart;

    if (findCart.products.find((i) => i.product == pId)) {
      cart = await cartServices.updateQuantityInCart(cId, pId);
    } else {
      cart = await cartServices.addProductInCart(cId, pId);
    }

    res.status(200).json({ status: "success", data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const deleteProductInCart = async (req = request, res = response) => {
  try {
    const { cId, pId } = req.params;

    const cart = await cartServices.deleteProductInCart(cId, pId);

    res.status(200).json({ status: "success", data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const updateProductInCart = async (req = request, res = response) => {
  try {
    const { cId, pId } = req.params;
    const { quantity } = req.body;

    const cart = await cartServices.updateProductInCart(cId, pId, quantity);

    res.status(200).json({ status: "success", data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const deleteCart = async (req = request, res = response) => {
  try {
    const { cId } = req.params;

    const cart = await cartServices.deleteCart(cId);

    res.status(200).json({ status: "success", data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const purchaseCart = async (req = request, res = response) => {
  try {
    const { cId } = req.params;
    const cartTotal = await cartServices.purchaseCart(cId);
    const ticket = await ticketServices.createTicket(req.user.email, cartTotal);

    res.status(200).json({ status: "success", data: ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

export default {
  createCart,
  getCartById,
  postCart,
  postProductInCart,
  deleteProductInCart,
  updateProductInCart,
  deleteCart,
  purchaseCart,
};
