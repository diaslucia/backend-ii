import envsConfig from "../config/env.config.js";
import cartRepository from "../managers/cart.repository.js";
import userRepository from "../managers/user.repository.js";
import { sendEmail } from "../utils/sendEmail.js";
import { mailingTemplate } from "../utils/mailingTemplate.js";
import productRepository from "../managers/products.repository.js";

const purchaseEmail = async (userId, cId) => {
  const cart = await cartRepository.getDataById(cId);
  const user = await userRepository.getById(userId);
  let total = 0;

  for (const productCart of cart.products) {
    const product = await productRepository.getById(productCart.product);
    if (product.stock >= productCart.quantity) {
      total += product.price * productCart.quantity;
    }
  }

  const html = mailingTemplate(user, cart.products, total);

  return await sendEmail(
    envsConfig.GMAIL_EMAIL,
    "Purchase Confirmation",
    "Your ticket",
    html
  );
};

export default { purchaseEmail };
