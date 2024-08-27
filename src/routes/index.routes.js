import { Router } from "express";
import sessionRoute from "./session.routes.js";
import productsRoutes from "./products.routes.js";
import cartRoutes from "./cart.routes.js";
import contactRoutes from "./contact.routes.js";

const router = Router();

router.use("/session", sessionRoute);
router.use("/products", productsRoutes);
router.use("/cart", cartRoutes);
router.use("/contact", contactRoutes);
router.get("*", async (req, res) => {
  try {
    res.status(404).json({ status: "error", message: "Route not found" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

export default router;
