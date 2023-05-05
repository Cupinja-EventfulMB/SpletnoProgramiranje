import { Router } from "express";
import { register, login } from "../controllers/authController.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/hello", (req,res) =>{
    res.send("hello")
})

export default router;
