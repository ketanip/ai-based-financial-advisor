import { Router } from "express";
import controllers from "./controller";

const router = Router();

router.post("/sign-in", controllers.SignIn);
router.post("/sign-up", controllers.SignUp);

export default router;