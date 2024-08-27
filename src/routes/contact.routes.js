import { Router } from "express";
import contactControllers from "../controllers/contact.controllers.js";

const router = Router();

router.get("/email", contactControllers.getEmail);

export default router;
