import { cartModel } from "../models/cart.model.js";

const getAll = async () => {
  const carts = await cartModel.find();
  return carts;
};

const getById = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
};

const getDataById = async (id) => {
  // populate te devuelve el producto con su info ( no solo el id )
  const cart = await cartModel.findById(id).populate("products.product");
  return cart;
};

const create = async (data) => {
  const cart = await cartModel.create(data);
  return cart;
};

const update = async (id, data) => {
  const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
  return cartUpdate;
};

const deleteOne = async (id) => {
  const cart = await cartModel.deleteOne({ _id: id });
  return cart;
};

const addProductInCart = async (cId, pId) => {
  const cartUpdate = cartModel.findOneAndUpdate(
    { _id: cId },
    {
      $push: {
        products: { product: pId, quantity: 1 },
      },
    },
    { new: true }
  );
  return cartUpdate;
};

const updateQuantityInCart = async (cId, pId) => {
  const cartUpdate = cartModel.findOneAndUpdate(
    { _id: cId, "products.product": pId },
    {
      $inc: { "products.$.quantity": 1 },
    },
    { new: true }
  );
  return cartUpdate;
};

const deleteProductInCart = async (cId, pId) => {
  const cartUpdate = cartModel.findOneAndUpdate(
    { _id: cId },
    { $pull: { products: { product: pId } } },
    { new: true }
  );
  return cartUpdate;
};

const updateProductInCart = async (cId, pId, quantity) => {
  const cartUpdate = cartModel.findOneAndUpdate(
    { _id: cId, "products.product": pId },
    { $set: { "products.$.quantity": quantity } },
    { new: true }
  );
  return cartUpdate;
};

const clearProductsInCart = async (cId) => {
  const cartUpdate = cartModel.findOneAndUpdate(
    { _id: cId },
    { $set: { products: [] } },
    { new: true }
  );
  return cartUpdate;
};

const purchaseCart = async (cId) => {
  const cartUpdate = cartModel.findOneAndUpdate(
    { _id: cId },
    { $set: { purchased: true } },
    { new: true }
  );
  return cartUpdate;
};

export default {
  getAll,
  getById,
  getDataById,
  create,
  update,
  deleteOne,
  addProductInCart,
  updateQuantityInCart,
  deleteProductInCart,
  updateProductInCart,
  clearProductsInCart,
};
