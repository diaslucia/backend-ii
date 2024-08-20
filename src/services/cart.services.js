import cartRepository from "../managers/cart.repository.js";
import productRepository from "../managers/products.repository.js";

const createCart = async () => {
  return await cartRepository.getAll();
};

const getCartById = async (cId) => {
  return await cartRepository.getDataById(cId);
};

const postCart = async (cartData) => {
  return await cartRepository.create(cartData);
};

const postProductInCart = async (cId) => {
  return await cartRepository.getById(cId);
};

const deleteProductInCart = async (cId, pId) => {
  return await cartRepository.deleteProductInCart(cId, pId);
};

const updateProductInCart = async (cId, pId, quantity) => {
  return await cartRepository.updateProductInCart(cId, pId, quantity);
};

const deleteCart = async (cId) => {
  return await cartRepository.clearProductsInCart(cId);
};

const updateQuantityInCart = async (cId, pId) => {
  return await cartRepository.updateQuantityInCart(cId, pId);
};

const addProductInCart = async (cId, pId) => {
  return await cartRepository.addProductInCart(cId, pId);
};

const purchaseCart = async (cId) => {
  const cart = await cartRepository.getById(cId);
  let total = 0;
  const productsWithOutStock = [];

  for (const productCart of cart.products) {
    const product = await productRepository.getById(productCart.product);

    if (product.stock >= productCart.quantity) {
      total += product.price * productCart.quantity;
      await productRepository.update(product._id, {
        stock: product.stock - productCart.quantity,
      });
    } else {
      productsWithOutStock.push(productCart);
    }
  }

  await cartRepository.update(cId, { products: productsWithOutStock });

  return total;
};

export default {
  createCart,
  getCartById,
  postCart,
  postProductInCart,
  deleteProductInCart,
  updateProductInCart,
  deleteCart,
  updateQuantityInCart,
  addProductInCart,
  purchaseCart,
};
