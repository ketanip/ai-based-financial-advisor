import { Router } from "express";
import controller from "./controller";
import { isAuthenticated } from "@/middlewares";

const router = Router();

router.use(isAuthenticated);

router.get("/:chat_id", controller.getMessages);
router.post("/chat/:chat_id", controller.sentNewMessage);

export default router;
