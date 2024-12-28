import express from "express";
import authController from "../controllers/authController.js";
import tokenValidator from "../utility/tokenValidator.js";
const { authorization, limiter } = tokenValidator;
const {} = authController;

const router = express.Router();

router.post("/signin", limiter);

export default router;
