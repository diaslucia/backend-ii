import { Router } from "express";
// Controllers
import viewsControllers from "../controllers/views.controllers.js";

const router = Router();

router.get("/", viewsControllers.getView);

export default router;
