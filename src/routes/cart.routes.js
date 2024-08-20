import { Router } from "express";
// Middlewares
import { passportCall } from "../middleware/passport.middleware.js";
import { checkCartExists } from "../middleware/checkCartExists.middleware.js";
import { checkProdAndCartExists } from "../middleware/checkProdAndCartExists.middleware.js";
import { checkCartPost } from "../middleware/checkCartPost.middleware.js";
import { isUserCart } from "../middleware/isUserCart.middleware.js";
import { checkProdStock } from "../middleware/checkProdStock.middleware.js";
import { authorization } from "../middleware/authorization.middleware.js";
// Controllers
import cartControllers from "../controllers/cart.controllers.js";

const router = Router();

router.get("/", cartControllers.createCart);

router.get("/:cId", checkCartExists, cartControllers.getCartById);

router.post(
  "/",
  passportCall("jwt"),
  authorization("user"),
  checkCartPost,
  cartControllers.postCart
);

router.post(
  "/:cId/product/:pId",
  passportCall("jwt"),
  authorization("user"),
  checkCartExists,
  isUserCart,
  cartControllers.postProductInCart
);

router.delete(
  "/:cId/product/:pId",
  passportCall("jwt"),
  authorization("user"),
  checkProdAndCartExists,
  cartControllers.deleteProductInCart
);

router.put(
  "/:cId/product/:pId",
  passportCall("jwt"),
  authorization("user"),
  checkProdAndCartExists,
  cartControllers.updateProductInCart
);

router.delete(
  "/:cId",
  passportCall("jwt"),
  authorization("user"),
  checkCartExists,
  cartControllers.deleteCart
);

router.get(
  "/:cId/purchase",
  passportCall("jwt"),
  authorization("user"),
  checkCartExists,
  checkProdStock,
  cartControllers.purchaseCart
);

export default router;
