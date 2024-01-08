import { Router } from "express";
import { getAll, getOne, create, remove } from "../controllers/messageController.js";
const router = Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", create);

router.delete("/:id", remove);

export default router;