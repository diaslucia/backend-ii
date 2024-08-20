import { Router } from "express";
// Middlewares
import { checkProductExists } from "../middleware/checkProductExists.middleware.js";
import { checkProductPut } from "../middleware/checkProductPut.middleware.js";
import { checkProductPost } from "../middleware/checkProductPost.middleware.js";
import { authorization } from "../middleware/authorization.middleware.js";
// Controllers
import productsControllers from "../controllers/products.controllers.js";

const router = Router();

router.get("/", productsControllers.getProducts);

router.get("/:pId", checkProductExists, productsControllers.getProductById);

router.post(
  "/",
  authorization("admin"),
  checkProductPost,
  productsControllers.postProduct
);

router.put(
  "/:pId",
  authorization("admin"),
  checkProductExists,
  checkProductPut,
  productsControllers.putProduct
);

router.delete(
  "/:pId",
  authorization("admin"),
  checkProductExists,
  productsControllers.deleteProduct
);

export default router;
