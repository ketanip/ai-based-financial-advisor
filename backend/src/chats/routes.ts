import { Router } from "express";
import controller from "./controller";
import { isAuthenticated } from "@/middlewares";

const router = Router();

router.use(isAuthenticated);

router.get("/", controller.getChats);
router.post("/", controller.createChat);
router.get("/:id", controller.getChat);
router.put("/:id", controller.updateChat);
router.delete("/:id", controller.deleteChat);

export default router;
